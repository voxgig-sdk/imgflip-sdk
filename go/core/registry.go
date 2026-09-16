package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewFreeEntityFunc func(client *ImgflipSDK, entopts map[string]any) ImgflipEntity

var NewPremiumEntityFunc func(client *ImgflipSDK, entopts map[string]any) ImgflipEntity

