

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ImgflipSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('FreeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IMGFLIP_TEST_LIVE=TRUE.
  afterEach(liveDelay('IMGFLIP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ImgflipSDK.test()
    const ent = testsdk.Free()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ImgflipSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Free().load({"type":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IMGFLIP_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'free.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"boxes":{"a":true,"h":"Boxes","n":"boxes","r":false,"sh":"For creating memes with more than two text boxes or for further customization.","t":"`$ARRAY`","key$":"boxes","index$":0},"font":{"a":true,"h":"Font","n":"font","r":false,"sh":"The font family to use for the text.","t":"`$STRING`","key$":"font","index$":1},"max_font_size":{"a":true,"h":"Max Font Size","n":"max_font_size","r":false,"sh":"Maximum font size in pixels","t":"`$INTEGER`","key$":"max_font_size","index$":2},"memes":{"a":true,"h":"Memes","n":"memes","r":false,"t":"`$ARRAY`","key$":"memes","index$":3},"no_watermark":{"a":true,"h":"No Watermark","n":"no_watermark","r":false,"sh":"[Premium only] Remove the imgflip.com watermark","t":"`$BOOLEAN`","key$":"no_watermark","index$":4},"password":{"a":true,"h":"Password","n":"password","r":true,"sh":"Password for the Imgflip account","t":"`$STRING`","key$":"password","index$":5},"template_id":{"a":true,"h":"Template Id","n":"template_id","r":true,"sh":"A template ID as returned by the get_memes response","t":"`$STRING`","key$":"template_id","index$":6},"text0":{"a":true,"h":"Text0","n":"text0","r":false,"sh":"Top text for the meme (do not use if using boxes parameter)","t":"`$STRING`","key$":"text0","index$":7},"text1":{"a":true,"h":"Text1","n":"text1","r":false,"sh":"Bottom text for the meme (do not use if using boxes parameter)","t":"`$STRING`","key$":"text1","index$":8},"username":{"a":true,"h":"Username","n":"username","r":true,"sh":"Username of a valid Imgflip account","t":"`$STRING`","key$":"username","index$":9}},"name":"free","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /caption_image","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/caption_image","q":{},"r":{},"rb":{"fields":[{"list":true,"name":"boxes"},{"name":"font"},{"name":"max_font_size"},{"name":"no_watermark"},{"name":"password"},{"name":"template_id"},{"name":"text0"},{"name":"text1"},{"name":"username"}],"kind":"form","media":"application/x-www-form-urlencoded"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"caption_image"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /get_memes","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"image","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/get_memes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"get_memes"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"free","name__orig":"free","Name":"Free","name_":"free","name-":"free","NAME":"FREE","index$":0}, {"active":true,"entity":"free","key$":"BasicFreeFlow","kind":"basic","name":"BasicFreeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"free_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"free_ref01","srcdatavar":"free_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-free_ref01"}}],"index$":1}]}, 'Free', {"POST /caption_image":{"protocol":"http","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["template_id","username","password"],"properties":{"template_id":{"type":"string","description":"A template ID as returned by the get_memes response","example":"61579","key$":"template_id"},"username":{"type":"string","description":"Username of a valid Imgflip account","key$":"username"},"password":{"type":"string","description":"Password for the Imgflip account","key$":"password"},"text0":{"type":"string","description":"Top text for the meme (do not use if using boxes parameter)","key$":"text0"},"text1":{"type":"string","description":"Bottom text for the meme (do not use if using boxes parameter)","key$":"text1"},"font":{"type":"string","description":"The font family to use for the text. Defaults to impact. Can also use arial or any of the 1,500+ Google Fonts","default":"impact","key$":"font"},"max_font_size":{"type":"integer","description":"Maximum font size in pixels","default":50,"key$":"max_font_size"},"no_watermark":{"type":"boolean","description":"[Premium only] Remove the imgflip.com watermark","key$":"no_watermark"},"boxes":{"type":"array","description":"For creating memes with more than two text boxes or for further customization. Limited to 20 text boxes per image.","items":{"type":"object","required":["text"],"properties":{"text":{"type":"string","description":"The text to display in this box"},"x":{"type":"integer","description":"X coordinate of the top left corner of the text box"},"y":{"type":"integer","description":"Y coordinate of the top left corner of the text box"},"width":{"type":"integer","description":"Width of the text box"},"height":{"type":"integer","description":"Height of the text box"},"color":{"type":"string","description":"Text color in hex format","example":"#ffffff"},"outline_color":{"type":"string","description":"Text outline color in hex format","example":"#000000"}},"x-ref":"#/components/schemas/TextBox"},"key$":"boxes"}},"index$":1}}}},"parameters":[]},"GET /get_memes":{"protocol":"http","parameters":[{"name":"type","in":"query","description":"The type of meme templates to return. Valid values are 'gif' or 'image'. Specify one or multiple separated by commas (e.g. type=gif,image).","required":false,"schema":{"type":"string","default":"image","example":"image"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"free.create.0":"GET-only live run: needs POST /caption_image"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const free_ref01_ent = client.Free()
    let free_ref01_data = setup.data.new.free['free_ref01']

    free_ref01_data = (await free_ref01_ent.create(free_ref01_data)).data()
    assert(null != free_ref01_data)


    // LOAD
    const free_ref01_match_dt0: any = {}
    const free_ref01_data_dt0 = (await free_ref01_ent.load(free_ref01_match_dt0)).data()
    assert(null != free_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/free/FreeTestData.json')

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
    ['free01','free02','free03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IMGFLIP_TEST_FREE_ENTID': idmap,
    'IMGFLIP_TEST_LIVE': 'FALSE',
    'IMGFLIP_TEST_EXPLAIN': 'FALSE',
    'IMGFLIP_APIKEY': '',
    'IMGFLIP_SECRET': '',
  })

  idmap = env['IMGFLIP_TEST_FREE_ENTID']

  const live = 'TRUE' === env.IMGFLIP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IMGFLIP_TEST_FREE_ENTID']
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
  
