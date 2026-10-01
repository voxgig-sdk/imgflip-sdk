import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
