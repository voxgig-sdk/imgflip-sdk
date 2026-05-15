# Imgflip SDK utility: make_context
require_relative '../core/context'
module ImgflipUtilities
  MakeContext = ->(ctxmap, basectx) {
    ImgflipContext.new(ctxmap, basectx)
  }
end
