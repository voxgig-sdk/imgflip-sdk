-- Imgflip SDK exists test

local sdk = require("imgflip_sdk")

describe("ImgflipSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
