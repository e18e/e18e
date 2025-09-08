---
description: Modern  replacements for the unmaintained faker package generating massive amounts of fake (but realistic) data
---

# Replacements for `faker`

## `@faker-js/faker`

[`@faker-js/faker`](https://github.com/faker-js/faker) is a direct, community‑maintained fork of `faker` with new features, bugfixes, modern ESM/CJS builds, and updated data/locales.

```ts
const faker = require('faker') // [!code --]
const { faker } = require('@faker-js/faker') // [!code ++]

// Name → Person
const name = faker.name.findName() // [!code --]
const name = faker.person.fullName() // [!code ++]

// “createCard” → compose your own object
const card = faker.helpers.createCard() // [!code --]
const user = { // [!code ++]
  id: faker.string.uuid(), // [!code ++]
  name: faker.person.fullName(), // [!code ++]
  email: faker.internet.email(), // [!code ++]
  phone: faker.phone.number(), // [!code ++]
  address: {  // [!code ++]
    street: faker.location.streetAddress(), // [!code ++]
    city: faker.location.city(), // [!code ++]
    zip: faker.location.zipCode(), // [!code ++]
    country: faker.location.country(), // [!code ++]
  }, // [!code ++]
} // [!code ++]
```
