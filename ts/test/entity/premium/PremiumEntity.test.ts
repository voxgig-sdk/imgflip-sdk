

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"meme","req":false,"type":"`$ANY`","index$":0},{"active":true,"name":"memes","req":false,"type":"`$ARRAY`","index$":1}],"name":"premium","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /ai_meme","json":"{\"operationId\":\"aiMeme\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"model\":{\"default\":\"openai\",\"description\":\"Which neural network model to use\",\"enum\":[\"openai\",\"classic\"],\"type\":\"string\"},\"no_watermark\":{\"description\":\"Remove the imgflip.com watermark\",\"type\":\"boolean\"},\"password\":{\"description\":\"Password for the Imgflip account\",\"type\":\"string\"},\"prefix_text\":{\"description\":\"Max 64 chars. Initial prefix text to seed the meme text. For openai model, used as a general topic. For classic model, shorter is generally better\",\"maxLength\":64,\"type\":\"string\"},\"template_id\":{\"description\":\"Choose one of the 48 templates (classic model) or any popular Imgflip template (openai model). If not specified, randomly selects from available templates\",\"type\":\"string\"},\"username\":{\"description\":\"Username of the Imgflip account with the Premium API subscription\",\"type\":\"string\"}},\"required\":[\"username\",\"password\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"data\":{\"properties\":{\"page_url\":{\"description\":\"URL to the meme page on Imgflip\",\"example\":\"https://imgflip.com/i/123abc\",\"format\":\"uri\",\"type\":\"string\"},\"template_id\":{\"description\":\"The template ID that was used\",\"example\":89370399,\"type\":\"integer\"},\"texts\":{\"description\":\"The AI-generated text for each text box\",\"example\":[\"you can't get caught to sing a conversation\",\"if you don't have any money\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"description\":\"URL to the generated meme image\",\"example\":\"https://i.imgflip.com/123abc.jpg\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"},{\"properties\":{\"error_message\":{\"description\":\"A description of why the request failed\",\"example\":\"Some hopefully-useful statement about why it failed\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}]}}},\"description\":\"Successful AI meme generation\"}},\"security\":[{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/ai_meme","segments":[{"lit":"ai_meme"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /automeme","json":"{\"operationId\":\"automeme\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"no_watermark\":{\"description\":\"Remove the imgflip.com watermark\",\"type\":\"boolean\"},\"password\":{\"description\":\"Password for the Imgflip account\",\"type\":\"string\"},\"text\":{\"description\":\"The text to display on the meme. This will also be used to determine which meme template to use\",\"type\":\"string\"},\"username\":{\"description\":\"Username of the Imgflip account with the Premium API subscription\",\"type\":\"string\"}},\"required\":[\"username\",\"password\",\"text\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"data\":{\"properties\":{\"page_url\":{\"description\":\"URL to the meme page on Imgflip\",\"example\":\"https://imgflip.com/i/123abc\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the generated meme image\",\"example\":\"https://i.imgflip.com/123abc.jpg\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"},{\"properties\":{\"error_message\":{\"description\":\"A description of why the request failed\",\"example\":\"Some hopefully-useful statement about why it failed\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}]}}},\"description\":\"Successful or failed automeme creation\"}},\"security\":[{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/automeme","segments":[{"lit":"automeme"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"POST /caption_gif","json":"{\"operationId\":\"captionGif\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"boxes\":{\"description\":\"Text boxes for the meme. Limited to 20 text boxes per image.\",\"items\":{\"properties\":{\"color\":{\"description\":\"Text color in hex format\",\"example\":\"#ffffff\",\"type\":\"string\"},\"height\":{\"description\":\"Height of the text box\",\"type\":\"integer\"},\"outline_color\":{\"description\":\"Text outline color in hex format\",\"example\":\"#000000\",\"type\":\"string\"},\"text\":{\"description\":\"The text to display in this box\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the text box\",\"type\":\"integer\"},\"x\":{\"description\":\"X coordinate of the top left corner of the text box\",\"type\":\"integer\"},\"y\":{\"description\":\"Y coordinate of the top left corner of the text box\",\"type\":\"integer\"}},\"required\":[\"text\"],\"type\":\"object\"},\"type\":\"array\"},\"font\":{\"default\":\"impact\",\"description\":\"The font family to use for the text\",\"type\":\"string\"},\"max_font_size\":{\"default\":50,\"description\":\"Maximum font size in pixels\",\"type\":\"integer\"},\"no_watermark\":{\"description\":\"Remove the imgflip.com watermark\",\"type\":\"boolean\"},\"password\":{\"description\":\"Password for the Imgflip account\",\"type\":\"string\"},\"template_id\":{\"description\":\"An animated template ID\",\"type\":\"string\"},\"username\":{\"description\":\"Username of a valid Imgflip account\",\"type\":\"string\"}},\"required\":[\"template_id\",\"username\",\"password\",\"boxes\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"data\":{\"properties\":{\"page_url\":{\"description\":\"URL to the meme page on Imgflip\",\"example\":\"https://imgflip.com/i/123abc\",\"format\":\"uri\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the generated meme image\",\"example\":\"https://i.imgflip.com/123abc.jpg\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"},{\"properties\":{\"error_message\":{\"description\":\"A description of why the request failed\",\"example\":\"Some hopefully-useful statement about why it failed\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}]}}},\"description\":\"Successful or failed GIF creation\"}},\"security\":[{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/caption_gif","segments":[{"lit":"caption_gif"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{},"contract":{"id":"POST /get_meme","json":"{\"operationId\":\"getMeme\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"password\":{\"description\":\"Password for the Imgflip account\",\"type\":\"string\"},\"template_id\":{\"description\":\"The template ID to retrieve\",\"type\":\"string\"},\"username\":{\"description\":\"Username of a valid Imgflip account\",\"type\":\"string\"}},\"required\":[\"username\",\"password\",\"template_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"meme\":{\"allOf\":[{\"properties\":{\"box_count\":{\"description\":\"The default number of text boxes the meme uses\",\"example\":2,\"type\":\"integer\"},\"height\":{\"description\":\"Height of the image in pixels\",\"example\":335,\"type\":\"integer\"},\"id\":{\"description\":\"The unique template ID\",\"example\":\"61579\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the meme template\",\"example\":\"One Does Not Simply\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the meme template image\",\"example\":\"https://i.imgflip.com/1bij.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the image in pixels\",\"example\":568,\"type\":\"integer\"}},\"type\":\"object\"},{\"properties\":{\"captions\":{\"description\":\"Estimated number of all-time captions of this meme, rounded\",\"example\":1750,\"type\":\"integer\"}},\"type\":\"object\"}]}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response with meme details\"}},\"security\":[{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/get_meme","segments":[{"lit":"get_meme"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":3},{"active":true,"args":{},"contract":{"id":"POST /search_memes","json":"{\"operationId\":\"searchMemes\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"include_nsfw\":{\"default\":0,\"description\":\"Use include_nsfw=1 to allow not-safe-for-work memes to be returned\",\"enum\":[0,1],\"type\":\"integer\"},\"password\":{\"description\":\"Password for the Imgflip account\",\"type\":\"string\"},\"query\":{\"description\":\"A text query to search the meme database for. Searches both names and alternate names\",\"type\":\"string\"},\"type\":{\"default\":\"image\",\"description\":\"The type of meme templates to search for. Valid values are 'gif' or 'image'. Specify one or multiple separated by commas\",\"type\":\"string\"},\"username\":{\"description\":\"Username of the Imgflip account with the Premium API subscription\",\"type\":\"string\"}},\"required\":[\"username\",\"password\",\"query\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"memes\":{\"items\":{\"allOf\":[{\"properties\":{\"box_count\":{\"description\":\"The default number of text boxes the meme uses\",\"example\":2,\"type\":\"integer\"},\"height\":{\"description\":\"Height of the image in pixels\",\"example\":335,\"type\":\"integer\"},\"id\":{\"description\":\"The unique template ID\",\"example\":\"61579\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the meme template\",\"example\":\"One Does Not Simply\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the meme template image\",\"example\":\"https://i.imgflip.com/1bij.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the image in pixels\",\"example\":568,\"type\":\"integer\"}},\"type\":\"object\"},{\"properties\":{\"captions\":{\"description\":\"Estimated number of all-time captions of this meme, rounded\",\"example\":1750,\"type\":\"integer\"}},\"type\":\"object\"}]},\"type\":\"array\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful search response\"}},\"security\":[{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Username and password are sent as form parameters in the request body, not as HTTP Basic Auth headers\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/search_memes","segments":[{"lit":"search_memes"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":4}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"premium","name__orig":"premium","Name":"Premium","name_":"premium","name-":"premium","NAME":"PREMIUM","index$":1}, {"active":true,"entity":"premium","key$":"BasicPremiumFlow","kind":"basic","name":"BasicPremiumFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"premium_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Premium')
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
  
