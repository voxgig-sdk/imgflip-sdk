

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ImgflipSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PremiumEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IMGFLIP_TEST_LIVE=TRUE.
  afterEach(liveDelay('IMGFLIP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ImgflipSDK.test()
    const ent = testsdk.Premium()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IMGFLIP_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'premium.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"meme":{"a":true,"h":"Meme","n":"meme","r":false,"t":"`$ANY`","key$":"meme","index$":0},"memes":{"a":true,"h":"Memes","n":"memes","r":false,"t":"`$ARRAY`","key$":"memes","index$":1}},"name":"premium","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /ai_meme","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/ai_meme","q":{},"r":{},"s":[{"lit":"ai_meme"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /automeme","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/automeme","q":{},"r":{},"s":[{"lit":"automeme"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /caption_gif","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/caption_gif","q":{},"r":{},"s":[{"lit":"caption_gif"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"POST /get_meme","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/get_meme","q":{},"r":{},"s":[{"lit":"get_meme"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":3},{"a":true,"co":{"id":"POST /search_memes","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/search_memes","q":{},"r":{},"s":[{"lit":"search_memes"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":4}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"premium","name__orig":"premium","Name":"Premium","name_":"premium","name-":"premium","NAME":"PREMIUM","index$":1}, {"active":true,"entity":"premium","key$":"BasicPremiumFlow","kind":"basic","name":"BasicPremiumFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"premium_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Premium', {"POST /ai_meme":{"protocol":"http","operationId":"aiMeme","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["username","password"],"properties":{"username":{"type":"string","description":"Username of the Imgflip account with the Premium API subscription"},"password":{"type":"string","description":"Password for the Imgflip account"},"model":{"type":"string","description":"Which neural network model to use","enum":["openai","classic"],"default":"openai"},"template_id":{"type":"string","description":"Choose one of the 48 templates (classic model) or any popular Imgflip template (openai model). If not specified, randomly selects from available templates"},"prefix_text":{"type":"string","description":"Max 64 chars. Initial prefix text to seed the meme text. For openai model, used as a general topic. For classic model, shorter is generally better","maxLength":64},"no_watermark":{"type":"boolean","description":"Remove the imgflip.com watermark"}}}}}},"responses":{"200":{"description":"Successful AI meme generation","content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"success":{"type":"boolean","example":true},"data":{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"URL to the generated meme image","example":"https://i.imgflip.com/123abc.jpg"},"page_url":{"type":"string","format":"uri","description":"URL to the meme page on Imgflip","example":"https://imgflip.com/i/123abc"},"template_id":{"type":"integer","description":"The template ID that was used","example":89370399},"texts":{"type":"array","description":"The AI-generated text for each text box","items":{"type":"string"},"example":["you can't get caught to sing a conversation","if you don't have any money"]}}}},"x-ref":"#/components/schemas/AIMemeSuccessResponse"},{"type":"object","properties":{"success":{"type":"boolean","example":false},"error_message":{"type":"string","description":"A description of why the request failed","example":"Some hopefully-useful statement about why it failed"}},"x-ref":"#/components/schemas/ErrorResponse"}],"index$":0}}}}},"parameters":[],"security":[{"basicAuth":[]}],"securitySource":"operation","securitySchemes":{"basicAuth":{"type":"http","scheme":"basic","description":"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers"}}},"POST /automeme":{"protocol":"http","operationId":"automeme","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["username","password","text"],"properties":{"username":{"type":"string","description":"Username of the Imgflip account with the Premium API subscription"},"password":{"type":"string","description":"Password for the Imgflip account"},"text":{"type":"string","description":"The text to display on the meme. This will also be used to determine which meme template to use"},"no_watermark":{"type":"boolean","description":"Remove the imgflip.com watermark"}}}}}},"responses":{"200":{"description":"Successful or failed automeme creation","content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"success":{"type":"boolean","example":true},"data":{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"URL to the generated meme image","example":"https://i.imgflip.com/123abc.jpg"},"page_url":{"type":"string","format":"uri","description":"URL to the meme page on Imgflip","example":"https://imgflip.com/i/123abc"}}}},"x-ref":"#/components/schemas/CaptionSuccessResponse"},{"type":"object","properties":{"success":{"type":"boolean","example":false},"error_message":{"type":"string","description":"A description of why the request failed","example":"Some hopefully-useful statement about why it failed"}},"x-ref":"#/components/schemas/ErrorResponse"}],"index$":0}}}}},"parameters":[],"security":[{"basicAuth":[]}],"securitySource":"operation","securitySchemes":{"basicAuth":{"type":"http","scheme":"basic","description":"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers"}}},"POST /caption_gif":{"protocol":"http","operationId":"captionGif","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["template_id","username","password","boxes"],"properties":{"template_id":{"type":"string","description":"An animated template ID"},"username":{"type":"string","description":"Username of a valid Imgflip account"},"password":{"type":"string","description":"Password for the Imgflip account"},"font":{"type":"string","description":"The font family to use for the text","default":"impact"},"max_font_size":{"type":"integer","description":"Maximum font size in pixels","default":50},"no_watermark":{"type":"boolean","description":"Remove the imgflip.com watermark"},"boxes":{"type":"array","description":"Text boxes for the meme. Limited to 20 text boxes per image.","items":{"type":"object","required":["text"],"properties":{"text":{"type":"string","description":"The text to display in this box"},"x":{"type":"integer","description":"X coordinate of the top left corner of the text box"},"y":{"type":"integer","description":"Y coordinate of the top left corner of the text box"},"width":{"type":"integer","description":"Width of the text box"},"height":{"type":"integer","description":"Height of the text box"},"color":{"type":"string","description":"Text color in hex format","example":"#ffffff"},"outline_color":{"type":"string","description":"Text outline color in hex format","example":"#000000"}},"x-ref":"#/components/schemas/TextBox"}}}}}}},"responses":{"200":{"description":"Successful or failed GIF creation","content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"success":{"type":"boolean","example":true},"data":{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"URL to the generated meme image","example":"https://i.imgflip.com/123abc.jpg"},"page_url":{"type":"string","format":"uri","description":"URL to the meme page on Imgflip","example":"https://imgflip.com/i/123abc"}}}},"x-ref":"#/components/schemas/CaptionSuccessResponse"},{"type":"object","properties":{"success":{"type":"boolean","example":false},"error_message":{"type":"string","description":"A description of why the request failed","example":"Some hopefully-useful statement about why it failed"}},"x-ref":"#/components/schemas/ErrorResponse"}],"index$":0}}}}},"parameters":[],"security":[{"basicAuth":[]}],"securitySource":"operation","securitySchemes":{"basicAuth":{"type":"http","scheme":"basic","description":"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers"}}},"POST /get_meme":{"protocol":"http","operationId":"getMeme","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["username","password","template_id"],"properties":{"username":{"type":"string","description":"Username of a valid Imgflip account"},"password":{"type":"string","description":"Password for the Imgflip account"},"template_id":{"type":"string","description":"The template ID to retrieve"}}}}}},"responses":{"200":{"description":"Successful response with meme details","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true},"data":{"type":"object","properties":{"meme":{"allOf":[{"type":"object","properties":{"id":{"description":"The unique template ID","example":"61579","type":"string"},"name":{"description":"The name of the meme template","example":"One Does Not Simply","type":"string"},"url":{"description":"URL to the meme template image","example":"https://i.imgflip.com/1bij.jpg","format":"uri","type":"string"},"width":{"description":"Width of the image in pixels","example":568,"type":"integer"},"height":{"description":"Height of the image in pixels","example":335,"type":"integer"},"box_count":{"description":"The default number of text boxes the meme uses","example":2,"type":"integer"}},"x-ref":"#/components/schemas/MemeTemplate"},{"type":"object","properties":{"captions":{"type":"integer","description":"Estimated number of all-time captions of this meme, rounded","example":1750}}}],"x-ref":"#/components/schemas/MemeTemplateWithCaptions","key$":"meme"}},"index$":0}}}}}}},"parameters":[],"security":[{"basicAuth":[]}],"securitySource":"operation","securitySchemes":{"basicAuth":{"type":"http","scheme":"basic","description":"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers"}}},"POST /search_memes":{"protocol":"http","operationId":"searchMemes","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["username","password","query"],"properties":{"username":{"type":"string","description":"Username of the Imgflip account with the Premium API subscription"},"password":{"type":"string","description":"Password for the Imgflip account"},"query":{"type":"string","description":"A text query to search the meme database for. Searches both names and alternate names"},"type":{"type":"string","description":"The type of meme templates to search for. Valid values are 'gif' or 'image'. Specify one or multiple separated by commas","default":"image"},"include_nsfw":{"type":"integer","description":"Use include_nsfw=1 to allow not-safe-for-work memes to be returned","default":0,"enum":[0,1]}}}}}},"responses":{"200":{"description":"Successful search response","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true},"data":{"type":"object","properties":{"memes":{"type":"array","items":{"allOf":[{"type":"object","properties":{"id":{"description":"The unique template ID","example":"61579","type":"string"},"name":{"description":"The name of the meme template","example":"One Does Not Simply","type":"string"},"url":{"description":"URL to the meme template image","example":"https://i.imgflip.com/1bij.jpg","format":"uri","type":"string"},"width":{"description":"Width of the image in pixels","example":568,"type":"integer"},"height":{"description":"Height of the image in pixels","example":335,"type":"integer"},"box_count":{"description":"The default number of text boxes the meme uses","example":2,"type":"integer"}},"x-ref":"#/components/schemas/MemeTemplate"},{"type":"object","properties":{"captions":{"type":"integer","description":"Estimated number of all-time captions of this meme, rounded","example":1750}}}],"x-ref":"#/components/schemas/MemeTemplateWithCaptions"},"key$":"memes"}},"index$":0}}}}}}},"parameters":[],"security":[{"basicAuth":[]}],"securitySource":"operation","securitySchemes":{"basicAuth":{"type":"http","scheme":"basic","description":"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const premium_ref01_ent = client.Premium()
    let premium_ref01_data = setup.data.new.premium['premium_ref01']

    premium_ref01_data = (await premium_ref01_ent.create(premium_ref01_data)).data()
    assert(null != premium_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/premium/PremiumTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ImgflipSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['premium01','premium02','premium03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IMGFLIP_TEST_PREMIUM_ENTID': idmap,
    'IMGFLIP_TEST_LIVE': 'FALSE',
    'IMGFLIP_TEST_EXPLAIN': 'FALSE',
    'IMGFLIP_APIKEY': '',
    'IMGFLIP_SECRET': '',
  })

  idmap = env['IMGFLIP_TEST_PREMIUM_ENTID']

  const live = 'TRUE' === env.IMGFLIP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IMGFLIP_TEST_PREMIUM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ImgflipSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
