# Imgflip SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ImgflipUtility.registrar = ->(u) {
  u.clean = ImgflipUtilities::Clean
  u.done = ImgflipUtilities::Done
  u.make_error = ImgflipUtilities::MakeError
  u.feature_add = ImgflipUtilities::FeatureAdd
  u.feature_hook = ImgflipUtilities::FeatureHook
  u.feature_init = ImgflipUtilities::FeatureInit
  u.fetcher = ImgflipUtilities::Fetcher
  u.make_fetch_def = ImgflipUtilities::MakeFetchDef
  u.make_context = ImgflipUtilities::MakeContext
  u.make_options = ImgflipUtilities::MakeOptions
  u.make_request = ImgflipUtilities::MakeRequest
  u.make_response = ImgflipUtilities::MakeResponse
  u.make_result = ImgflipUtilities::MakeResult
  u.make_point = ImgflipUtilities::MakePoint
  u.make_spec = ImgflipUtilities::MakeSpec
  u.make_url = ImgflipUtilities::MakeUrl
  u.param = ImgflipUtilities::Param
  u.prepare_auth = ImgflipUtilities::PrepareAuth
  u.prepare_body = ImgflipUtilities::PrepareBody
  u.prepare_headers = ImgflipUtilities::PrepareHeaders
  u.prepare_method = ImgflipUtilities::PrepareMethod
  u.prepare_params = ImgflipUtilities::PrepareParams
  u.prepare_path = ImgflipUtilities::PreparePath
  u.prepare_query = ImgflipUtilities::PrepareQuery
  u.result_basic = ImgflipUtilities::ResultBasic
  u.result_body = ImgflipUtilities::ResultBody
  u.result_headers = ImgflipUtilities::ResultHeaders
  u.transform_request = ImgflipUtilities::TransformRequest
  u.transform_response = ImgflipUtilities::TransformResponse
}
