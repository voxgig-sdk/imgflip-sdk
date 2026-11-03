# Premium entity test

require "minitest/autorun"
require "json"
require_relative "../Imgflip_sdk"
require_relative "runner"

class PremiumEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ImgflipSDK.test(nil, nil)
    ent = testsdk.Premium(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ImgflipConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ImgflipSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Premium(nil).create({ "boxes" => "x", "font" => 1, "password" => "x", "query" => "x", "template_id" => "x", "text" => "x", "username" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = premium_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "premium." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"premium.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /ai_meme\"}"
      skip("Live coverage incomplete: premium.create.0 excluded (GET-only live run: needs POST /ai_meme)")
    end

    client = setup[:client]

    # CREATE
    premium_ref01_ent = client.Premium(nil)
    premium_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.premium"), "premium_ref01"))

    premium_ref01_data_result = premium_ref01_ent.create(premium_ref01_data, nil)
    premium_ref01_data = Helpers.to_map(premium_ref01_data_result.respond_to?(:data_get) ? premium_ref01_data_result.data_get : premium_ref01_data_result)
    assert !premium_ref01_data.nil?

  end
end

def premium_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "premium", "PremiumTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ImgflipSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["premium01", "premium02", "premium03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["IMGFLIP_TEST_PREMIUM_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IMGFLIP_TEST_PREMIUM_ENTID" => idmap,
    "IMGFLIP_TEST_LIVE" => "FALSE",
    "IMGFLIP_TEST_EXPLAIN" => "FALSE",
    "IMGFLIP_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["IMGFLIP_TEST_PREMIUM_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IMGFLIP_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["IMGFLIP_APIKEY"],
      },
      extra || {},
    ])
    client = ImgflipSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IMGFLIP_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IMGFLIP_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
