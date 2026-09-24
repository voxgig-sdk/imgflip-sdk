
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ImgflipSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ImgflipSDK.test()
    equal(testsdk instanceof ImgflipSDK, true,
      'ImgflipSDK.test() must return a client synchronously')
  })

})
