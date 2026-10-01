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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "memes": { "a": true, "h": "Memes", "n": "memes", "r": false, "t": "`$ARRAY`", "key$": "memes", "index$": 0 } }, "name": "free", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /caption_image", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/caption_image", "q": {}, "r": {}, "s": [{ "lit": "caption_image" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /get_memes", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "image", "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/get_memes", "q": { "exist": ["type"] }, "r": {}, "s": [{ "lit": "get_memes" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "free", "name__orig": "free", "Name": "Free", "name_": "free", "name-": "free", "NAME": "FREE", "index$": 0 }, { "active": true, "entity": "free", "key$": "BasicFreeFlow", "kind": "basic", "name": "BasicFreeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "free_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "free_ref01", "srcdatavar": "free_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-free_ref01" } }], "index$": 1 }] }, 'Free', { "POST /caption_image": { "protocol": "http", "requestBody": { "required": true, "content": { "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["template_id", "username", "password"], "properties": { "template_id": { "type": "string", "description": "A template ID as returned by the get_memes response", "example": "61579" }, "username": { "type": "string", "description": "Username of a valid Imgflip account" }, "password": { "type": "string", "description": "Password for the Imgflip account" }, "text0": { "type": "string", "description": "Top text for the meme (do not use if using boxes parameter)" }, "text1": { "type": "string", "description": "Bottom text for the meme (do not use if using boxes parameter)" }, "font": { "type": "string", "description": "The font family to use for the text. Defaults to impact. Can also use arial or any of the 1,500+ Google Fonts", "default": "impact" }, "max_font_size": { "type": "integer", "description": "Maximum font size in pixels", "default": 50 }, "no_watermark": { "type": "boolean", "description": "[Premium only] Remove the imgflip.com watermark" }, "boxes": { "type": "array", "description": "For creating memes with more than two text boxes or for further customization. Limited to 20 text boxes per image.", "items": { "type": "object", "required": ["text"], "properties": { "text": { "type": "string", "description": "The text to display in this box" }, "x": { "type": "integer", "description": "X coordinate of the top left corner of the text box" }, "y": { "type": "integer", "description": "Y coordinate of the top left corner of the text box" }, "width": { "type": "integer", "description": "Width of the text box" }, "height": { "type": "integer", "description": "Height of the text box" }, "color": { "type": "string", "description": "Text color in hex format", "example": "#ffffff" }, "outline_color": { "type": "string", "description": "Text outline color in hex format", "example": "#000000" } }, "x-ref": "#/components/schemas/TextBox" } } } } } } }, "parameters": [] }, "GET /get_memes": { "protocol": "http", "parameters": [{ "name": "type", "in": "query", "description": "The type of meme templates to return. Valid values are 'gif' or 'image'. Specify one or multiple separated by commas (e.g. type=gif,image).", "required": false, "schema": { "type": "string", "default": "image", "example": "image" }, "index$": 0 }] } });
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