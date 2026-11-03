package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Imgflip",
			"slug": "imgflip",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.imgflip.com",
			"auth": map[string]any{
				"prefix": "Basic",
				"basic": true,
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"free": map[string]any{},
				"premium": map[string]any{},
			},
		},
		"entity": map[string]any{
			"free": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "boxes",
						"title": "Boxes",
						"type": "`$ARRAY`",
						"short": "For creating memes with more than two text boxes or for further customization.",
					},
					map[string]any{
						"name": "font",
						"title": "Font",
						"type": "`$STRING`",
						"short": "The font family to use for the text.",
					},
					map[string]any{
						"name": "max_font_size",
						"title": "Max Font Size",
						"type": "`$INTEGER`",
						"short": "Maximum font size in pixels",
					},
					map[string]any{
						"name": "memes",
						"title": "Memes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "no_watermark",
						"title": "No Watermark",
						"type": "`$BOOLEAN`",
						"short": "[Premium only] Remove the imgflip.com watermark",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"short": "Password for the Imgflip account",
					},
					map[string]any{
						"name": "template_id",
						"title": "Template Id",
						"type": "`$STRING`",
						"req": true,
						"short": "A template ID as returned by the get_memes response",
					},
					map[string]any{
						"name": "text0",
						"title": "Text0",
						"type": "`$STRING`",
						"short": "Top text for the meme (do not use if using boxes parameter)",
					},
					map[string]any{
						"name": "text1",
						"title": "Text1",
						"type": "`$STRING`",
						"short": "Bottom text for the meme (do not use if using boxes parameter)",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
						"req": true,
						"short": "Username of a valid Imgflip account",
					},
				},
				"name": "free",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/caption_image",
								"segments": []any{
									map[string]any{
										"lit": "caption_image",
									},
								},
								"parts": []any{
									"caption_image",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"list": true,
											"name": "boxes",
										},
										map[string]any{
											"name": "font",
										},
										map[string]any{
											"name": "max_font_size",
										},
										map[string]any{
											"name": "no_watermark",
										},
										map[string]any{
											"name": "password",
										},
										map[string]any{
											"name": "template_id",
										},
										map[string]any{
											"name": "text0",
										},
										map[string]any{
											"name": "text1",
										},
										map[string]any{
											"name": "username",
										},
									},
									"kind": "form",
									"media": "application/x-www-form-urlencoded",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/get_memes",
								"segments": []any{
									map[string]any{
										"lit": "get_memes",
									},
								},
								"parts": []any{
									"get_memes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "image",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"premium": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "boxes",
						"title": "Boxes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Text boxes for the meme.",
					},
					map[string]any{
						"name": "font",
						"title": "Font",
						"type": "`$STRING`",
						"short": "The font family to use for the text",
					},
					map[string]any{
						"name": "include_nsfw",
						"title": "Include Nsfw",
						"type": "`$INTEGER`",
						"short": "Use include_nsfw=1 to allow not-safe-for-work memes to be returned",
					},
					map[string]any{
						"name": "max_font_size",
						"title": "Max Font Size",
						"type": "`$INTEGER`",
						"short": "Maximum font size in pixels",
					},
					map[string]any{
						"name": "meme",
						"title": "Meme",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "memes",
						"title": "Memes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"short": "Which neural network model to use",
					},
					map[string]any{
						"name": "no_watermark",
						"title": "No Watermark",
						"type": "`$BOOLEAN`",
						"short": "Remove the imgflip.com watermark",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"req": true,
						"short": "Password for the Imgflip account",
					},
					map[string]any{
						"name": "prefix_text",
						"title": "Prefix Text",
						"type": "`$STRING`",
						"short": "Max 64 chars.",
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$STRING`",
						"req": true,
						"short": "A text query to search the meme database for.",
					},
					map[string]any{
						"name": "template_id",
						"title": "Template Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Choose one of the 48 templates (classic model) or any popular Imgflip template (openai model).",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
						"short": "The text to display on the meme.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of meme templates to search for.",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
						"req": true,
						"short": "Username of the Imgflip account with the Premium API subscription",
					},
				},
				"name": "premium",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/ai_meme",
								"segments": []any{
									map[string]any{
										"lit": "ai_meme",
									},
								},
								"parts": []any{
									"ai_meme",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"name": "model",
										},
										map[string]any{
											"name": "no_watermark",
										},
										map[string]any{
											"name": "password",
										},
										map[string]any{
											"name": "prefix_text",
										},
										map[string]any{
											"name": "template_id",
										},
										map[string]any{
											"name": "username",
										},
									},
									"kind": "form",
									"media": "application/x-www-form-urlencoded",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/automeme",
								"segments": []any{
									map[string]any{
										"lit": "automeme",
									},
								},
								"parts": []any{
									"automeme",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"name": "no_watermark",
										},
										map[string]any{
											"name": "password",
										},
										map[string]any{
											"name": "text",
										},
										map[string]any{
											"name": "username",
										},
									},
									"kind": "form",
									"media": "application/x-www-form-urlencoded",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/caption_gif",
								"segments": []any{
									map[string]any{
										"lit": "caption_gif",
									},
								},
								"parts": []any{
									"caption_gif",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"list": true,
											"name": "boxes",
										},
										map[string]any{
											"name": "font",
										},
										map[string]any{
											"name": "max_font_size",
										},
										map[string]any{
											"name": "no_watermark",
										},
										map[string]any{
											"name": "password",
										},
										map[string]any{
											"name": "template_id",
										},
										map[string]any{
											"name": "username",
										},
									},
									"kind": "form",
									"media": "application/x-www-form-urlencoded",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/get_meme",
								"segments": []any{
									map[string]any{
										"lit": "get_meme",
									},
								},
								"parts": []any{
									"get_meme",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"name": "password",
										},
										map[string]any{
											"name": "template_id",
										},
										map[string]any{
											"name": "username",
										},
									},
									"kind": "form",
									"media": "application/x-www-form-urlencoded",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/search_memes",
								"segments": []any{
									map[string]any{
										"lit": "search_memes",
									},
								},
								"parts": []any{
									"search_memes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"name": "include_nsfw",
										},
										map[string]any{
											"name": "password",
										},
										map[string]any{
											"name": "query",
										},
										map[string]any{
											"name": "type",
										},
										map[string]any{
											"name": "username",
										},
									},
									"kind": "form",
									"media": "application/x-www-form-urlencoded",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
