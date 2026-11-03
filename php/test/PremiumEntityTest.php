<?php
declare(strict_types=1);

// Premium entity test

require_once __DIR__ . '/../imgflip_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PremiumEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ImgflipSDK::test(null, null);
        $ent = $testsdk->Premium(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = ImgflipConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = ImgflipSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Premium(null)->create(["boxes" => 'x', "font" => 1, "password" => 'x', "query" => 'x', "template_id" => 'x', "text" => 'x', "username" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = premium_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "premium." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"premium.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /ai_meme"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: premium.create.0 excluded (GET-only live run: needs POST /ai_meme)');
        }

        $client = $setup["client"];

        // CREATE
        $premium_ref01_ent = $client->Premium(null);
        $premium_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.premium"), "premium_ref01"));

        $premium_ref01_data_result = $premium_ref01_ent->create($premium_ref01_data, null);
        $premium_ref01_data = Helpers::to_map(is_object($premium_ref01_data_result) && method_exists($premium_ref01_data_result, 'data_get') ? $premium_ref01_data_result->data_get() : $premium_ref01_data_result);
        $this->assertNotNull($premium_ref01_data);

    }
}

function premium_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/premium/PremiumTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ImgflipSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["premium01", "premium02", "premium03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("IMGFLIP_TEST_PREMIUM_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IMGFLIP_TEST_PREMIUM_ENTID" => $idmap,
        "IMGFLIP_TEST_LIVE" => "FALSE",
        "IMGFLIP_TEST_EXPLAIN" => "FALSE",
        "IMGFLIP_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IMGFLIP_TEST_PREMIUM_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IMGFLIP_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["IMGFLIP_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new ImgflipSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["IMGFLIP_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IMGFLIP_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
