# Imgflip SDK

Generate memes programmatically: browse templates, caption images and GIFs, search, or create memes with AI

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Imgflip API

Imgflip API is the developer interface to [Imgflip](https://imgflip.com), the popular meme-generation site run by Imgflip LLC. It exposes a small, focused REST surface for building memes from templates, captioning still images and animated GIFs, searching a large template database, and synthesising new memes with AI.

What you get from the API:

- `GET /get_memes` — list of popular, captionable meme templates with their IDs, names, and dimensions
- `POST /caption_image` — add text boxes to a template and receive the rendered meme URL
- `POST /caption_gif` — caption animated GIF templates (Premium)
- `POST /search_memes` — search across 1M+ templates by keyword (Premium)
- `POST /get_meme` — fetch a specific meme template by ID (Premium)
- `POST /automeme` and `POST /ai_meme` — auto-generate or AI-generate memes from text (Premium)

All requests are made over HTTPS to `https://api.imgflip.com`. Authentication uses an Imgflip account username and password posted in the request body (never in the URL). The free tier has no hard rate limit but may throttle abusive traffic; Premium plans include a monthly request allowance with small per-request overage fees. CORS is supported, so calls work directly from browser clients.

## Try it

**TypeScript**
```bash
npm install imgflip
```

**Python**
```bash
pip install imgflip-sdk
```

**PHP**
```bash
composer require voxgig/imgflip-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/imgflip-sdk/go
```

**Ruby**
```bash
gem install imgflip-sdk
```

**Lua**
```bash
luarocks install imgflip-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ImgflipSDK } from 'imgflip'

const client = new ImgflipSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o imgflip-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "imgflip": {
      "command": "/abs/path/to/imgflip-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Free** | Endpoints available on the free tier, such as `GET /get_memes` for listing popular templates and `POST /caption_image` for rendering captioned memes (watermarked output). | `/caption_image` |
| **Premium** | Endpoints that require a paid Imgflip Premium account, including `POST /caption_gif`, `POST /search_memes`, `POST /get_meme`, `POST /automeme`, and `POST /ai_meme`. | `/ai_meme` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from imgflip_sdk import ImgflipSDK

client = ImgflipSDK({})


# Load a specific free
free, err = client.Free(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'imgflip_sdk.php';

$client = new ImgflipSDK([]);


// Load a specific free
[$free, $err] = $client->Free(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/imgflip-sdk/go"

client := sdk.NewImgflipSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Imgflip_sdk"

client = ImgflipSDK.new({})


# Load a specific free
free, err = client.Free(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("imgflip_sdk")

local client = sdk.new({})


-- Load a specific free
local free, err = client:Free(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ImgflipSDK.test()
const result = await client.Free().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ImgflipSDK.test(None, None)
result, err = client.Free(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ImgflipSDK::test(null, null);
[$result, $err] = $client->Free(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Free(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ImgflipSDK.test(nil, nil)
result, err = client.Free(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Free(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Imgflip API

- Upstream: [https://imgflip.com](https://imgflip.com)
- API docs: [https://imgflip.com/api](https://imgflip.com/api)

- Imgflip LLC operates the API; usage is subject to Imgflip's terms of service
- Most endpoints require a valid Imgflip account (username + password) sent in the POST body
- Free tier covers basic template listing and captioning (output is watermarked); Premium ($9.99/month) unlocks GIF captioning, search, AI meme generation, and watermark removal
- Generated images are publicly accessible by URL and may be auto-deleted if unused; user-generated content is not curated

---

Generated from the Imgflip API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
