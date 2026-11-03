# Imgflip Ruby SDK Reference

Complete API reference for the Imgflip Ruby SDK.


## ImgflipSDK

### Constructor

```ruby
require_relative 'Imgflip_sdk'

client = ImgflipSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ImgflipSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ImgflipSDK.test
```


### Instance Methods

#### `Free(data = nil)`

Create a new `Free` entity instance. Pass `nil` for no initial data.

#### `Premium(data = nil)`

Create a new `Premium` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## FreeEntity

```ruby
free = client.Free
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `Array` | No | For creating memes with more than two text boxes or for further customization. |
| `font` | `String` | No | The font family to use for the text. |
| `max_font_size` | `Integer` | No | Maximum font size in pixels |
| `memes` | `Array` | No |  |
| `no_watermark` | `Boolean` | No | [Premium only] Remove the imgflip.com watermark |
| `password` | `String` | Yes | Password for the Imgflip account |
| `template_id` | `String` | Yes | A template ID as returned by the get_memes response |
| `text0` | `String` | No | Top text for the meme (do not use if using boxes parameter) |
| `text1` | `String` | No | Bottom text for the meme (do not use if using boxes parameter) |
| `username` | `String` | Yes | Username of a valid Imgflip account |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Free.create({
  "password" => "example_password", # String
  "template_id" => "example_template_id", # String
  "username" => "example_username", # String
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Free.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FreeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PremiumEntity

```ruby
premium = client.Premium
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `Array` | Yes | Text boxes for the meme. |
| `font` | `String` | No | The font family to use for the text |
| `include_nsfw` | `Integer` | No | Use include_nsfw=1 to allow not-safe-for-work memes to be returned |
| `max_font_size` | `Integer` | No | Maximum font size in pixels |
| `meme` | `Object` | No |  |
| `memes` | `Array` | No |  |
| `model` | `String` | No | Which neural network model to use |
| `no_watermark` | `Boolean` | No | Remove the imgflip.com watermark |
| `password` | `String` | Yes | Password for the Imgflip account |
| `prefix_text` | `String` | No | Max 64 chars. |
| `query` | `String` | Yes | A text query to search the meme database for. |
| `template_id` | `String` | No | Choose one of the 48 templates (classic model) or any popular Imgflip template (openai model). |
| `text` | `String` | Yes | The text to display on the meme. |
| `type` | `String` | No | The type of meme templates to search for. |
| `username` | `String` | Yes | Username of the Imgflip account with the Premium API subscription |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `boxes` | - |
| `font` | - |
| `include_nsfw` | - |
| `max_font_size` | - |
| `meme` | - |
| `memes` | - |
| `model` | - |
| `no_watermark` | - |
| `password` | - |
| `prefix_text` | - |
| `query` | - |
| `template_id` | Yes |
| `text` | - |
| `type` | - |
| `username` | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Premium.create({
  "boxes" => [], # Array
  "password" => "example_password", # String
  "query" => "example_query", # String
  "template_id" => "example_template_id", # String
  "text" => "example_text", # String
  "username" => "example_username", # String
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PremiumEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ruby
client = ImgflipSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

