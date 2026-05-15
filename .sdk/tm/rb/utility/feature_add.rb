# Imgflip SDK utility: feature_add
module ImgflipUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
