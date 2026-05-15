-- Imgflip SDK error

local ImgflipError = {}
ImgflipError.__index = ImgflipError


function ImgflipError.new(code, msg, ctx)
  local self = setmetatable({}, ImgflipError)
  self.is_sdk_error = true
  self.sdk = "Imgflip"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ImgflipError:error()
  return self.msg
end


function ImgflipError:__tostring()
  return self.msg
end


return ImgflipError
