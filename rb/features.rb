# Imgflip SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ImgflipFeatures
  def self.make_feature(name)
    case name
    when "base"
      ImgflipBaseFeature.new
    when "ratelimit"
      ImgflipRatelimitFeature.new
    when "retry"
      ImgflipRetryFeature.new
    when "test"
      ImgflipTestFeature.new
    when "timeout"
      ImgflipTimeoutFeature.new
    else
      ImgflipBaseFeature.new
    end
  end
end
