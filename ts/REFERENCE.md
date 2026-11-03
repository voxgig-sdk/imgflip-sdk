# Imgflip TypeScript SDK Reference

Complete API reference for the Imgflip TypeScript SDK.


## ImgflipSDK

### Constructor

```ts
new ImgflipSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.secret` | `string` | API secret for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ImgflipSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ImgflipSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ImgflipSDK` instance in test mode.


### Instance Methods

#### `Free(data?: object)`

Create a new `Free` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FreeEntity` instance.

#### `Premium(data?: object)`

Create a new `Premium` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PremiumEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ImgflipSDK.test()`.

**Returns:** `ImgflipSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## FreeEntity

```ts
const free = client.Free()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `any[]` | No | For creating memes with more than two text boxes or for further customization. |
| `font` | `string` | No | The font family to use for the text. |
| `max_font_size` | `number` | No | Maximum font size in pixels |
| `memes` | `any[]` | No |  |
| `no_watermark` | `boolean` | No | [Premium only] Remove the imgflip.com watermark |
| `password` | `string` | Yes | Password for the Imgflip account |
| `template_id` | `string` | Yes | A template ID as returned by the get_memes response |
| `text0` | `string` | No | Top text for the meme (do not use if using boxes parameter) |
| `text1` | `string` | No | Bottom text for the meme (do not use if using boxes parameter) |
| `username` | `string` | Yes | Username of a valid Imgflip account |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Free().create({
  password: 'example_password',
  template_id: 'example_template_id',
  username: 'example_username',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Free().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FreeEntity` instance with the same client and
options.

#### `client()`

Return the parent `ImgflipSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PremiumEntity

```ts
const premium = client.Premium()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `any[]` | Yes | Text boxes for the meme. |
| `font` | `string` | No | The font family to use for the text |
| `include_nsfw` | `number` | No | Use include_nsfw=1 to allow not-safe-for-work memes to be returned |
| `max_font_size` | `number` | No | Maximum font size in pixels |
| `meme` | `any` | No |  |
| `memes` | `any[]` | No |  |
| `model` | `string` | No | Which neural network model to use |
| `no_watermark` | `boolean` | No | Remove the imgflip.com watermark |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Premium().create({
  boxes: [],
  password: 'example_password',
  query: 'example_query',
  template_id: 'example_template_id',
  text: 'example_text',
  username: 'example_username',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PremiumEntity` instance with the same client and
options.

#### `client()`

Return the parent `ImgflipSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new ImgflipSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

