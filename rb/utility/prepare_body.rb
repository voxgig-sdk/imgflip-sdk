# Imgflip SDK utility: prepare_body
require_relative 'media'
module ImgflipUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ImgflipUtilities.raw_body(ctx.reqdata) if ImgflipUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
