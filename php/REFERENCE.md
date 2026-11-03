# Imgflip PHP SDK Reference

Complete API reference for the Imgflip PHP SDK.


## ImgflipSDK

### Constructor

```php
require_once __DIR__ . '/imgflip_sdk.php';

$client = new ImgflipSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ImgflipSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ImgflipSDK::test();
```


### Instance Methods

#### `Free($data = null)`

Create a new `FreeEntity` instance. Pass `null` for no initial data.

#### `Premium($data = null)`

Create a new `PremiumEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ImgflipUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## FreeEntity

```php
$free = $client->Free();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `array` | No | For creating memes with more than two text boxes or for further customization. |
| `font` | `string` | No | The font family to use for the text. |
| `max_font_size` | `int` | No | Maximum font size in pixels |
| `memes` | `array` | No |  |
| `no_watermark` | `bool` | No | [Premium only] Remove the imgflip.com watermark |
| `password` | `string` | Yes | Password for the Imgflip account |
| `template_id` | `string` | Yes | A template ID as returned by the get_memes response |
| `text0` | `string` | No | Top text for the meme (do not use if using boxes parameter) |
| `text1` | `string` | No | Bottom text for the meme (do not use if using boxes parameter) |
| `username` | `string` | Yes | Username of a valid Imgflip account |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Free()->create([
  "password" => null, // string
  "template_id" => null, // string
  "username" => null, // string
]);
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Free()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FreeEntity`

Create a new `FreeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PremiumEntity

```php
$premium = $client->Premium();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `array` | Yes | Text boxes for the meme. |
| `font` | `string` | No | The font family to use for the text |
| `include_nsfw` | `int` | No | Use include_nsfw=1 to allow not-safe-for-work memes to be returned |
| `max_font_size` | `int` | No | Maximum font size in pixels |
| `meme` | `mixed` | No |  |
| `memes` | `array` | No |  |
| `model` | `string` | No | Which neural network model to use |
| `no_watermark` | `bool` | No | Remove the imgflip.com watermark |
| `password` | `string` | Yes | Password for the Imgflip account |
| `prefix_text` | `string` | No | Max 64 chars. |
| `query` | `string` | Yes | A text query to search the meme database for. |
| `template_id` | `string` | No | Choose one of the 48 templates (classic model) or any popular Imgflip template (openai model). |
| `text` | `string` | Yes | The text to display on the meme. |
| `type` | `string` | No | The type of meme templates to search for. |
| `username` | `string` | Yes | Username of the Imgflip account with the Premium API subscription |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Premium()->create([
  "boxes" => null, // array
  "password" => null, // string
  "query" => null, // string
  "template_id" => null, // string
  "text" => null, // string
  "username" => null, // string
]);
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PremiumEntity`

Create a new `PremiumEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new ImgflipSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

