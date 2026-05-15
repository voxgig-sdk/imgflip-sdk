
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ImgflipSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ImgflipSDK.test()
    equal(null !== testsdk, true)
  })

})
