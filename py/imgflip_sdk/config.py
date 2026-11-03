# Imgflip SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Imgflip",
            "slug": "imgflip",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.imgflip.com",
            "auth": {
                "prefix": "Basic",
                "basic": True,
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "free": {},
                "premium": {},
            },
        },
        "entity": {
      "free": {
        "fields": [
          {
            "name": "boxes",
            "title": "Boxes",
            "type": "`$ARRAY`",
            "short": "For creating memes with more than two text boxes or for further customization.",
          },
          {
            "name": "font",
            "title": "Font",
            "type": "`$STRING`",
            "short": "The font family to use for the text.",
          },
          {
            "name": "max_font_size",
            "title": "Max Font Size",
            "type": "`$INTEGER`",
            "short": "Maximum font size in pixels",
          },
          {
            "name": "memes",
            "title": "Memes",
            "type": "`$ARRAY`",
          },
          {
            "name": "no_watermark",
            "title": "No Watermark",
            "type": "`$BOOLEAN`",
            "short": "[Premium only] Remove the imgflip.com watermark",
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "short": "Password for the Imgflip account",
          },
          {
            "name": "template_id",
            "title": "Template Id",
            "type": "`$STRING`",
            "req": True,
            "short": "A template ID as returned by the get_memes response",
          },
          {
            "name": "text0",
            "title": "Text0",
            "type": "`$STRING`",
            "short": "Top text for the meme (do not use if using boxes parameter)",
          },
          {
            "name": "text1",
            "title": "Text1",
            "type": "`$STRING`",
            "short": "Bottom text for the meme (do not use if using boxes parameter)",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
            "req": True,
            "short": "Username of a valid Imgflip account",
          },
        ],
        "name": "free",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/caption_image",
                "segments": [
                  {
                    "lit": "caption_image",
                  },
                ],
                "parts": [
                  "caption_image",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "body": {
                  "fields": [
                    {
                      "list": True,
                      "name": "boxes",
                    },
                    {
                      "name": "font",
                    },
                    {
                      "name": "max_font_size",
                    },
                    {
                      "name": "no_watermark",
                    },
                    {
                      "name": "password",
                    },
                    {
                      "name": "template_id",
                    },
                    {
                      "name": "text0",
                    },
                    {
                      "name": "text1",
                    },
                    {
                      "name": "username",
                    },
                  ],
                  "kind": "form",
                  "media": "application/x-www-form-urlencoded",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/get_memes",
                "segments": [
                  {
                    "lit": "get_memes",
                  },
                ],
                "parts": [
                  "get_memes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "image",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "premium": {
        "fields": [
          {
            "name": "boxes",
            "title": "Boxes",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Text boxes for the meme.",
          },
          {
            "name": "font",
            "title": "Font",
            "type": "`$STRING`",
            "short": "The font family to use for the text",
          },
          {
            "name": "include_nsfw",
            "title": "Include Nsfw",
            "type": "`$INTEGER`",
            "short": "Use include_nsfw=1 to allow not-safe-for-work memes to be returned",
          },
          {
            "name": "max_font_size",
            "title": "Max Font Size",
            "type": "`$INTEGER`",
            "short": "Maximum font size in pixels",
          },
          {
            "name": "meme",
            "title": "Meme",
            "type": "`$ANY`",
          },
          {
            "name": "memes",
            "title": "Memes",
            "type": "`$ARRAY`",
          },
          {
            "name": "model",
            "title": "Model",
            "type": "`$STRING`",
            "short": "Which neural network model to use",
          },
          {
            "name": "no_watermark",
            "title": "No Watermark",
            "type": "`$BOOLEAN`",
            "short": "Remove the imgflip.com watermark",
          },
          {
            "name": "password",
            "title": "Password",
            "type": "`$STRING`",
            "req": True,
            "short": "Password for the Imgflip account",
          },
          {
            "name": "prefix_text",
            "title": "Prefix Text",
            "type": "`$STRING`",
            "short": "Max 64 chars.",
          },
          {
            "name": "query",
            "title": "Query",
            "type": "`$STRING`",
            "req": True,
            "short": "A text query to search the meme database for.",
          },
          {
            "name": "template_id",
            "title": "Template Id",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Choose one of the 48 templates (classic model) or any popular Imgflip template (openai model).",
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "req": True,
            "short": "The text to display on the meme.",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "The type of meme templates to search for.",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
            "req": True,
            "short": "Username of the Imgflip account with the Premium API subscription",
          },
        ],
        "name": "premium",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/ai_meme",
                "segments": [
                  {
                    "lit": "ai_meme",
                  },
                ],
                "parts": [
                  "ai_meme",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "body": {
                  "fields": [
                    {
                      "name": "model",
                    },
                    {
                      "name": "no_watermark",
                    },
                    {
                      "name": "password",
                    },
                    {
                      "name": "prefix_text",
                    },
                    {
                      "name": "template_id",
                    },
                    {
                      "name": "username",
                    },
                  ],
                  "kind": "form",
                  "media": "application/x-www-form-urlencoded",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/automeme",
                "segments": [
                  {
                    "lit": "automeme",
                  },
                ],
                "parts": [
                  "automeme",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "body": {
                  "fields": [
                    {
                      "name": "no_watermark",
                    },
                    {
                      "name": "password",
                    },
                    {
                      "name": "text",
                    },
                    {
                      "name": "username",
                    },
                  ],
                  "kind": "form",
                  "media": "application/x-www-form-urlencoded",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/caption_gif",
                "segments": [
                  {
                    "lit": "caption_gif",
                  },
                ],
                "parts": [
                  "caption_gif",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "body": {
                  "fields": [
                    {
                      "list": True,
                      "name": "boxes",
                    },
                    {
                      "name": "font",
                    },
                    {
                      "name": "max_font_size",
                    },
                    {
                      "name": "no_watermark",
                    },
                    {
                      "name": "password",
                    },
                    {
                      "name": "template_id",
                    },
                    {
                      "name": "username",
                    },
                  ],
                  "kind": "form",
                  "media": "application/x-www-form-urlencoded",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/get_meme",
                "segments": [
                  {
                    "lit": "get_meme",
                  },
                ],
                "parts": [
                  "get_meme",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "body": {
                  "fields": [
                    {
                      "name": "password",
                    },
                    {
                      "name": "template_id",
                    },
                    {
                      "name": "username",
                    },
                  ],
                  "kind": "form",
                  "media": "application/x-www-form-urlencoded",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/search_memes",
                "segments": [
                  {
                    "lit": "search_memes",
                  },
                ],
                "parts": [
                  "search_memes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {},
                "select": {},
                "body": {
                  "fields": [
                    {
                      "name": "include_nsfw",
                    },
                    {
                      "name": "password",
                    },
                    {
                      "name": "query",
                    },
                    {
                      "name": "type",
                    },
                    {
                      "name": "username",
                    },
                  ],
                  "kind": "form",
                  "media": "application/x-www-form-urlencoded",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
