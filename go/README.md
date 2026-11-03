# Imgflip Golang SDK



The Golang SDK for the Imgflip API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Free(nil)` — each with the same small set of operations (`Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/imgflip-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/imgflip-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/imgflip-sdk/go=../imgflip-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/imgflip-sdk/go"
)

func main() {
    client := sdk.NewImgflipSDK(map[string]any{
        "apikey": os.Getenv("IMGFLIP_APIKEY"),
    })

    // Load a single free — the value is the entity; Data() reads its record.
    free, err := client.Free(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(free.(sdk.Entity).Data())

    // Create a free.
    created, err := client.Free(nil).Create(map[string]any{"password": "example_password", "template_id": "example_template_id", "username": "example_username"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
free, err := client.Free(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = free
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

free, err := client.Free(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(free.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewImgflipSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IMGFLIP_TEST_LIVE=TRUE
IMGFLIP_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewImgflipSDK

```go
func NewImgflipSDK(options map[string]any) *ImgflipSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ImgflipSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ImgflipSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Free` | `(data map[string]any) ImgflipEntityBase` | Create a Free entity instance. |
| `Premium` | `(data map[string]any) ImgflipEntityBase` | Create a Premium entity instance. |

### Entity interface (ImgflipEntityBase)

All entities implement the `ImgflipEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity, whose `Data()` reads its record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    free, err := client.Free(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // free is the entity; free.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Free

| Field | Description |
| --- | --- |
| `"boxes"` | For creating memes with more than two text boxes or for further customization. |
| `"font"` | The font family to use for the text. |
| `"max_font_size"` | Maximum font size in pixels |
| `"memes"` |  |
| `"no_watermark"` | [Premium only] Remove the imgflip.com watermark |
| `"password"` | Password for the Imgflip account |
| `"template_id"` | A template ID as returned by the get_memes response |
| `"text0"` | Top text for the meme (do not use if using boxes parameter) |
| `"text1"` | Bottom text for the meme (do not use if using boxes parameter) |
| `"username"` | Username of a valid Imgflip account |

Operations: Create, Load.

API path: `/caption_image`

#### Premium

| Field | Description |
| --- | --- |
| `"boxes"` | Text boxes for the meme. |
| `"font"` | The font family to use for the text |
| `"include_nsfw"` | Use include_nsfw=1 to allow not-safe-for-work memes to be returned |
| `"max_font_size"` | Maximum font size in pixels |
| `"meme"` |  |
| `"memes"` |  |
| `"model"` | Which neural network model to use |
| `"no_watermark"` | Remove the imgflip.com watermark |
| `"password"` | Password for the Imgflip account |
| `"prefix_text"` | Max 64 chars. |
| `"query"` | A text query to search the meme database for. |
| `"template_id"` | Choose one of the 48 templates (classic model) or any popular Imgflip template (openai model). |
| `"text"` | The text to display on the meme. |
| `"type"` | The type of meme templates to search for. |
| `"username"` | Username of the Imgflip account with the Premium API subscription |

Operations: Create.

API path: `/ai_meme`



## Entities


### Free

Create an instance: `free := client.Free(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boxes` | `[]any` | For creating memes with more than two text boxes or for further customization. |
| `font` | `string` | The font family to use for the text. |
| `max_font_size` | `int` | Maximum font size in pixels |
| `memes` | `[]any` |  |
| `no_watermark` | `bool` | [Premium only] Remove the imgflip.com watermark |
| `password` | `string` | Password for the Imgflip account |
| `template_id` | `string` | A template ID as returned by the get_memes response |
| `text0` | `string` | Top text for the meme (do not use if using boxes parameter) |
| `text1` | `string` | Bottom text for the meme (do not use if using boxes parameter) |
| `username` | `string` | Username of a valid Imgflip account |

#### Example: Load

```go
free, err := client.Free(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(free.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Free(nil).Create(map[string]any{
    "password": "example_password",
    "template_id": "example_template_id",
    "username": "example_username",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Premium

Create an instance: `premium := client.Premium(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boxes` | `[]any` | Text boxes for the meme. |
| `font` | `string` | The font family to use for the text |
| `include_nsfw` | `int` | Use include_nsfw=1 to allow not-safe-for-work memes to be returned |
| `max_font_size` | `int` | Maximum font size in pixels |
| `meme` | `any` |  |
| `memes` | `[]any` |  |
| `model` | `string` | Which neural network model to use |
| `no_watermark` | `bool` | Remove the imgflip.com watermark |
| `password` | `string` | Password for the Imgflip account |
| `prefix_text` | `string` | Max 64 chars. |
| `query` | `string` | A text query to search the meme database for. |
| `template_id` | `string` | Choose one of the 48 templates (classic model) or any popular Imgflip template (openai model). |
| `text` | `string` | The text to display on the meme. |
| `type` | `string` | The type of meme templates to search for. |
| `username` | `string` | Username of the Imgflip account with the Premium API subscription |

#### Example: Create

```go
result, err := client.Premium(nil).Create(map[string]any{
    "boxes": []any{},
    "password": "example_password",
    "query": "example_query",
    "template_id": "example_template_id",
    "text": "example_text",
    "username": "example_username",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/imgflip-sdk/go/
├── imgflip.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/imgflip-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
free := client.Free(nil)
free.Load(nil, nil)

// free.Data() now returns the free data from the last load
// free.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
