# Imgflip SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ImgflipFeatures
  def self.make_feature(name)
    case name
    when "base"
      ImgflipBaseFeature.new
    when "test"
      ImgflipTestFeature.new
    else
      ImgflipBaseFeature.new
    end
  end
end
