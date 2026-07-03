package voxgigimgflipsdk

import (
	"github.com/voxgig-sdk/imgflip-sdk/go/core"
	"github.com/voxgig-sdk/imgflip-sdk/go/entity"
	"github.com/voxgig-sdk/imgflip-sdk/go/feature"
	_ "github.com/voxgig-sdk/imgflip-sdk/go/utility"
)

// Type aliases preserve external API.
type ImgflipSDK = core.ImgflipSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ImgflipEntity = core.ImgflipEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ImgflipError = core.ImgflipError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewFreeEntityFunc = func(client *core.ImgflipSDK, entopts map[string]any) core.ImgflipEntity {
		return entity.NewFreeEntity(client, entopts)
	}
	core.NewPremiumEntityFunc = func(client *core.ImgflipSDK, entopts map[string]any) core.ImgflipEntity {
		return entity.NewPremiumEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewImgflipSDK = core.NewImgflipSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewImgflipSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ImgflipSDK  { return NewImgflipSDK(nil) }
func Test() *ImgflipSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
