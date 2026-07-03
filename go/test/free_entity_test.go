package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/imgflip-sdk/go"
	"github.com/voxgig-sdk/imgflip-sdk/go/core"

	vs "github.com/voxgig-sdk/imgflip-sdk/go/utility/struct"
)

func TestFreeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Free(nil)
		if ent == nil {
			t.Fatal("expected non-nil FreeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := freeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "free." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set IMGFLIP_TEST_FREE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		freeRef01Ent := client.Free(nil)
		freeRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "free"}, setup.data), "free_ref01"))

		freeRef01DataResult, err := freeRef01Ent.Create(freeRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		freeRef01Data = core.ToMapAny(freeRef01DataResult)
		if freeRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		freeRef01MatchDt0 := map[string]any{}
		freeRef01DataDt0Loaded, err := freeRef01Ent.Load(freeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if freeRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func freeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "free", "FreeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read free test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse free test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"free01", "free02", "free03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("IMGFLIP_TEST_FREE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IMGFLIP_TEST_FREE_ENTID": idmap,
		"IMGFLIP_TEST_LIVE":      "FALSE",
		"IMGFLIP_TEST_EXPLAIN":   "FALSE",
		"IMGFLIP_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["IMGFLIP_TEST_FREE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IMGFLIP_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["IMGFLIP_APIKEY"],
			},
			extra,
		})
		client = sdk.NewImgflipSDK(core.ToMapAny(mergedOpts))
	}

	live := env["IMGFLIP_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IMGFLIP_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
