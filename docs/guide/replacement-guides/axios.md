---
description: Modern alternatives to the axios package for making HTTP requests in browsers and Node.js
---

# Replacements for `axios`

## Native `fetch` API

The native [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API is available in Node.js (since v18.x) and all modern browsers. For most HTTP requests, it can replace `axios` without extra dependencies.

Example:

```js
import axios from 'axios' // [!code --]

const { data } = await axios.get('https://api.example.com/data') // [!code --]

const res = await fetch('https://api.example.com/data') // [!code ++]
const data = await res.json() // [!code ++]

await axios.post('https://api.example.com/data', { key: 'value' }) // [!code --]

await fetch('https://api.example.com/data', { // [!code ++]
  method: 'POST', // [!code ++]
  headers: { 'Content-Type': 'application/json' }, // [!code ++]
  body: JSON.stringify({ key: 'value' }) // [!code ++]
}) // [!code ++]
```

## `ky`

[`ky`](https://github.com/sindresorhus/ky) is a tiny, elegant HTTP client built on top of `fetch`. It offers a nicer API than raw fetch and supports hooks (interceptors), timeouts, and retries.

Example:

```js
import axios from 'axios' // [!code --]

const api = axios.create({ // [!code --]
  baseURL: 'https://api.example.com', // [!code --]
  timeout: 5000 // [!code --]
}) // [!code --]

api.interceptors.request.use(cfg => { // [!code --]
  cfg.headers.Authorization = 'Bearer token' // [!code --]
  return cfg // [!code --]
}) // [!code --]

const { data } = await api.get('/users') // [!code --]

import ky from 'ky' // [!code ++]

const api = ky.create({ // [!code ++]
  prefixUrl: 'https://api.example.com', // [!code ++]
  timeout: 5000, // ms // [!code ++]
  hooks: { // [!code ++]
    beforeRequest: [request => { // [!code ++]
      request.headers.set('Authorization', 'Bearer token') // [!code ++]
    }] // [!code ++]
  } // [!code ++]
}) // [!code ++]

const data = await api.get('users').json() // [!code ++]
```

## `ofetch`

[`ofetch`](https://github.com/unjs/ofetch) is a higher-level fetch wrapper with automatic JSON parsing, request/response interceptors, retries, and a simple API.

Example:

```js
import axios from 'axios' // [!code --]

const api = axios.create({ baseURL: 'https://api.example.com' }) // [!code --]
const { data } = await api.get('/user', { params: { id: 123 } }) // [!code --]
const created = (await api.post('/items', { name: 'A' })).data // [!code --]

import { ofetch } from 'ofetch' // [!code ++]

const api = ofetch.create({ // [!code ++]
  baseURL: 'https://api.example.com', // [!code ++]
  onRequest({ options }) { // [!code ++]
    options.headers = { ...(options.headers || {}), Authorization: 'Bearer token' } // [!code ++]
  } // [!code ++]
}) // [!code ++]

const data = await api('/user', { query: { id: 123 } }) // [!code ++]
const created = await api('/items', { method: 'POST', body: { name: 'A' } }) // [!code ++]
```