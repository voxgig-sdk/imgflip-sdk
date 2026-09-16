"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FreeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IMGFLIP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IMGFLIP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ImgflipSDK.test();
        const ent = testsdk.Free();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IMGFLIP_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'free.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "memes", "req": false, "type": "`$ARRAY`", "index$": 0 }], "name": "free", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /caption_image", "json": "{\"operationId\":\"captionImage\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"boxes\":{\"description\":\"For creating memes with more than two text boxes or for further customization. Limited to 20 text boxes per image.\",\"items\":{\"properties\":{\"color\":{\"description\":\"Text color in hex format\",\"example\":\"#ffffff\",\"type\":\"string\"},\"height\":{\"description\":\"Height of the text box\",\"type\":\"integer\"},\"outline_color\":{\"description\":\"Text outline color in hex format\",\"example\":\"#000000\",\"type\":\"string\"},\"text\":{\"description\":\"The text to display in this box\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the text box\",\"type\":\"integer\"},\"x\":{\"description\":\"X coordinate of the top left corner of the text box\",\"type\":\"integer\"},\"y\":{\"description\":\"Y coordinate of the top left corner of the text box\",\"type\":\"integer\"}},\"required\":[\"text\"],\"type\":\"object\"},\"type\":\"array\"},\"font\":{\"default\":\"impact\",\"description\":\"The font family to use for the text. Defaults to impact. Can also use arial or any of the 1,500+ Google Fonts\",\"type\":\"string\"},\"max_font_size\":{\"default\":50,\"description\":\"Maximum font size in pixels\",\"type\":\"integer\"},\"no_watermark\":{\"description\":\"[Premium only] Remove the imgflip.com watermark\",\"type\":\"boolean\"},\"password\":{\"description\":\"Password for the Imgflip account\",\"type\":\"string\"},\"template_id\":{\"description\":\"A template ID as returned by the get_memes response\",\"example\":\"61579\",\"type\":\"string\"},\"text0\":{\"description\":\"Top text for the meme (do not use if using boxes parameter)\",\"type\":\"string\"},\"text1\":{\"description\":\"Bottom text for the meme (do not use if using boxes parameter)\",\"type\":\"string\"},\"username\":{\"description\":\"Username of a valid Imgflip account\",\"type\":\"string\"}},\"required\":[\"template_id\",\"username\",\"password\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"data\":{\"properties\":{\"page_url\":{\"description\":\"URL to the meme page on Imgflip\",\"example\":\"https://imgflip.com/i/123abc\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the generated meme image\",\"example\":\"https://i.imgflip.com/123abc.jpg\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"},{\"properties\":{\"error_message\":{\"description\":\"A description of why the request failed\",\"example\":\"Some hopefully-useful statement about why it failed\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}]}}},\"description\":\"Successful or failed meme creation\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/caption_image", "segments": [{ "lit": "caption_image" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "image", "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /get_memes", "json": "{\"operationId\":\"getMemes\",\"parameters\":[{\"description\":\"The type of meme templates to return. Valid values are 'gif' or 'image'. Specify one or multiple separated by commas (e.g. type=gif,image).\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"default\":\"image\",\"example\":\"image\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"memes\":{\"items\":{\"properties\":{\"box_count\":{\"description\":\"The default number of text boxes the meme uses\",\"example\":2,\"type\":\"integer\"},\"height\":{\"description\":\"Height of the image in pixels\",\"example\":335,\"type\":\"integer\"},\"id\":{\"description\":\"The unique template ID\",\"example\":\"61579\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the meme template\",\"example\":\"One Does Not Simply\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the meme template image\",\"example\":\"https://i.imgflip.com/1bij.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the image in pixels\",\"example\":568,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response with meme templates\"}},\"securitySchemes\":{\"basicAuth\":{\"description\":\"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/get_memes", "segments": [{ "lit": "get_memes" }], "select": { "exist": ["type"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "free", "name__orig": "free", "Name": "Free", "name_": "free", "name-": "free", "NAME": "FREE", "index$": 0 }, { "active": true, "entity": "free", "key$": "BasicFreeFlow", "kind": "basic", "name": "BasicFreeFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "free_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "free_ref01", "srcdatavar": "free_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-free_ref01" } }], "index$": 1 }] }, 'Free');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const free_ref01_ent = client.Free();
        let free_ref01_data = setup.data.new.free['free_ref01'];
        free_ref01_data = (await free_ref01_ent.create(free_ref01_data)).data();
        (0, node_assert_1.default)(null != free_ref01_data);
        // LOAD
        const free_ref01_match_dt0 = {};
        const free_ref01_data_dt0 = (await free_ref01_ent.load(free_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != free_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/free/FreeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ImgflipSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['free01', 'free02', 'free03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IMGFLIP_TEST_FREE_ENTID': idmap,
        'IMGFLIP_TEST_LIVE': 'FALSE',
        'IMGFLIP_TEST_EXPLAIN': 'FALSE',
        'IMGFLIP_APIKEY': '',
        'IMGFLIP_SECRET': '',
    });
    idmap = env['IMGFLIP_TEST_FREE_ENTID'];
    const live = 'TRUE' === env.IMGFLIP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IMGFLIP_TEST_FREE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ImgflipSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.IMGFLIP_APIKEY,
                secret: env.IMGFLIP_SECRET,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.IMGFLIP_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=FreeEntity.test.js.map