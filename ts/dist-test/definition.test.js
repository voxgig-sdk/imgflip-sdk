"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "free",
        "accessor": "Free",
        "op": "create",
        "method": "POST",
        "path": "/caption_image",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [],
        "status": 200,
        "sample": {
            "success": true,
            "data": {
                "url": "https://i.imgflip.com/123abc.jpg",
                "page_url": "https://imgflip.com/i/123abc"
            }
        },
        "idField": "id"
    },
    {
        "entity": "free",
        "accessor": "Free",
        "op": "load",
        "method": "GET",
        "path": "/get_memes",
        "args": [],
        "select": {
            "type": "image"
        },
        "headers": [],
        "query": [
            "type"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "success": true,
            "data": {
                "memes": [
                    {
                        "box_count": 2,
                        "height": 335,
                        "id": "61579",
                        "name": "One Does Not Simply",
                        "url": "https://i.imgflip.com/1bij.jpg",
                        "width": 568
                    }
                ]
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map