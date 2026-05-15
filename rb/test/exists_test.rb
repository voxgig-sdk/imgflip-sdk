# Imgflip SDK exists test

require "minitest/autorun"
require_relative "../Imgflip_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ImgflipSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
