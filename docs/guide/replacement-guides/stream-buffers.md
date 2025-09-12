---
description: Modern alternatives to the stream-buffers package for buffering and generating streams in Node.js
---

# Replacements for `stream-buffers`

## Node.js Utility Consumers

Since Node.js ≥ 16.7.0 [Utility Consumers](https://nodejs.org/api/webstreams.html#webstreams_utility_consumers) let you consume a Readable stream fully into memory (`Buffer`/`string`/`JSON`/`Blob`/`ArrayBuffer`).

Example:

```ts
import streamBuffers from 'stream-buffers' // [!code --]
import { pipeline } from 'node:stream/promises' // [!code --]
import { buffer, text, json, blob, arrayBuffer } from 'node:stream/consumers' // [!code ++]

// Buffer with full contents
const sink1 = new streamBuffers.WritableStreamBuffer() // [!code --]
await pipeline(readable, sink1) // [!code --]
const buf = sink1.getContents() // [!code --]
const buf = await buffer(readable) // [!code ++]

// UTF‑8 string
const sink2 = new streamBuffers.WritableStreamBuffer() // [!code --]
await pipeline(readable, sink2) // [!code --]
const str = sink2.getContentsAsString('utf8') // [!code --]
const str = await text(readable) // [!code ++]

// JSON.parse() of a UTF‑8 string
const sink3 = new streamBuffers.WritableStreamBuffer() // [!code --]
await pipeline(readable, sink3) // [!code --]
const data = JSON.parse(sink3.getContentsAsString('utf8')) // [!code --]
const data = await json(readable) // [!code ++]

// Blob
const sink4 = new streamBuffers.WritableStreamBuffer() // [!code --]
await pipeline(readable, sink4) // [!code --]
const b = new Blob([sink4.getContents()]) // [!code --]
const b = await blob(readable) // [!code ++]

// ArrayBuffer
const sink5 = new streamBuffers.WritableStreamBuffer() // [!code --]
await pipeline(readable, sink5) // [!code --]
const tmp = sink5.getContents() // Buffer [!code --]
const ab = tmp.buffer.slice(tmp.byteOffset, tmp.byteOffset + tmp.byteLength) // [!code --]
const ab = await arrayBuffer(readable) // [!code ++]
```

## Capturing output when an API expects a Writable

Example:

```ts
import streamBuffers from 'stream-buffers' // [!code --]
import { PassThrough } from 'node:stream' // [!code ++]
import { buffer, text } from 'node:stream/consumers' // [!code ++]

const sink = new streamBuffers.WritableStreamBuffer() // [!code --]
const sink = new PassThrough() // [!code ++]

await someFnThatWritesTo(sink) // [!code --]
const out = sink.getContents() // or sink.getContentsAsString('utf8') // [!code --]

const resultP = buffer(sink) // or text(sink) // [!code ++]
await someFnThatWritesTo(sink) // [!code ++]
sink.end() // [!code ++]
const out = await resultP // [!code ++]
```

## Creating a Readable from data

Push data over time example:

```ts
import streamBuffers from 'stream-buffers' // [!code --]
import { Readable } from 'node:stream' // [!code ++]

const r = new streamBuffers.ReadableStreamBuffer() // [!code --]
const r = new Readable({ read() {} }) // [!code ++]

r.put('first chunk') // [!code --]
r.push('first chunk') // [!code ++]

r.put(Buffer.from('second chunk')) // [!code --]
r.push(Buffer.from('second chunk')) // [!code ++]

r.stop() // [!code --]
r.push(null) // [!code ++]
```

Control chunk size and frequency example:

```ts
import streamBuffers from 'stream-buffers' // [!code --]
import { Readable } from 'node:stream' // [!code ++]
import { setTimeout } from 'node:timers/promises' // [!code ++]

const r = new streamBuffers.ReadableStreamBuffer({ frequency: 10, chunkSize: 2048 }) // [!code --]
r.put(data) // [!code --]
r.stop() // [!code --]

const data = Buffer.from('...your data...') // [!code ++]
const chunkSize = 2048 // [!code ++]
const frequencyMs = 10 // [!code ++]

const r = Readable.from(async function* () { // [!code ++]
  for (let i = 0; i < data.length; i += chunkSize) { // [!code ++]
    yield data.slice(i, i + chunkSize) // [!code ++]
    await setTimeout(frequencyMs) // [!code ++]
  } // [!code ++]
}()) // [!code ++]
```