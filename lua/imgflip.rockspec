package = "voxgig-sdk-imgflip"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/imgflip-sdk.git"
}
description = {
  summary = "Imgflip SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["imgflip_sdk"] = "imgflip_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
