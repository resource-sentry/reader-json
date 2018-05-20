# Reader: JSON

Combines all properties from a single or directory of JSON files.
The reader can walk through deeply nested objects with some conventional limitations.

- Visit only first element of Array
- Add parent property to the qualifying name

![Version](https://img.shields.io/npm/v/@resource-sentry/reader-json.svg)
![Dependencies](https://david-dm.org/resource-sentry/reader-json.svg)

## Installation

> yarn add --dev @resource-sentry/reader-json

## Configuration

- `entry`, path to a single of a directory of JSON files
- `deep`, limit for nesting. Where `0` disables walk through nested objects.

## Example

```json
{
  "title": "My Title",
  "desc": {
    "header": "Big Header"
  }
}
```

JSON will be explored and added into `rs.js` file ready for use in production code.

```js
import * as Rs from './rs';

Rs.getResource(Rs.Text.TITLE); // Return "My Title"
Rs.getResource(Rs.Text.DESC_HEADER); // Return "Big Header"
```
