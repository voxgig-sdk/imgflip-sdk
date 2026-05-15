
import { Context } from './Context'


class ImgflipError extends Error {

  isImgflipError = true

  sdk = 'Imgflip'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ImgflipError
}

