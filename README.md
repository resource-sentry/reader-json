# Reader: JSON

Combines all properties from a single or directory of JSON files.
The reader can walk through deeply nested objects with some conventional limitations.

- Visits only first element of Array
- Adds parent property to the qualifying name
- Converts `Boolean` to a `Number` (Example: 0 or 1)
- Converts `null` to a `NULL <String>`

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
