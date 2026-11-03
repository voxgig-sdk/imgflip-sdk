# Free entity test

import json
import os
import time

import pytest

from imgflip_sdk.utility.voxgig_struct import voxgig_struct as vs
from imgflip_sdk import ImgflipSDK
from imgflip_sdk.core import helpers
from imgflip_sdk.config import shared_config
from imgflip_sdk.feature.base_feature import ImgflipBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestFreeEntity:

    def test_should_create_instance(self):
        testsdk = ImgflipSDK.test(None, None)
        ent = testsdk.Free(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = ImgflipSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Free(None).load({"type": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _free_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "free." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"free.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /caption_image\"}")
            return self._run_get_only_flow(setup)

        client = setup["client"]

        # CREATE
        free_ref01_ent = client.Free(None)
        free_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.free"), "free_ref01"))

        free_ref01_data = helpers.to_map(runner.entity_data(free_ref01_ent.create(free_ref01_data, None)))
        assert free_ref01_data is not None

        # LOAD
        free_ref01_match_dt0 = {}
        free_ref01_data_dt0_loaded = free_ref01_ent.load(free_ref01_match_dt0, None)
        assert free_ref01_data_dt0_loaded is not None


    def _run_get_only_flow(self, setup):
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        free_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.free")))
        free_ref01_data = None
        if len(free_ref01_data_raw) > 0:
            free_ref01_data = helpers.to_map(free_ref01_data_raw[0][1])

        # LOAD
        free_ref01_ent = client.Free(None)
        free_ref01_match_dt0 = {}
        free_ref01_data_dt0_loaded = free_ref01_ent.load(free_ref01_match_dt0, None)
        assert free_ref01_data_dt0_loaded is not None



def _free_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/free/FreeTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ImgflipSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["free01", "free02", "free03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "IMGFLIP_TEST_FREE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "IMGFLIP_TEST_FREE_ENTID": idmap,
        "IMGFLIP_TEST_LIVE": "FALSE",
        "IMGFLIP_TEST_EXPLAIN": "FALSE",
        "IMGFLIP_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("IMGFLIP_TEST_FREE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("IMGFLIP_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("IMGFLIP_APIKEY"),
            },
            extra or {},
        ])
        client = ImgflipSDK(helpers.to_map(merged_opts))

    _live = env.get("IMGFLIP_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("IMGFLIP_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
