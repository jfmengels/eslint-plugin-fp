# Forbid the use of `delete`

`delete` is an operator to remove fields from an object or elements from an array. This purposely mutates data, which is not wanted when doing functional programming.

### Fail

```js
delete foo;
delete foo.bar;
delete foo[bar];
```

### Pass

```js
var _ = require('lodash/fp');

var fooWithoutBar = _.omit('bar', foo);
var fooWithoutField = _.omit(bar, foo);
```
