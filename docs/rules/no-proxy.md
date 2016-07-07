# Forbid the use of `Proxy`

Proxies add a hidden layer of side-effects when accessing properties of objects or elements of arrays.

### Fail

```js
const handler = {
  get(target, key) {
    return Math.min(target[key], 0);
  }
};
const object = new Proxy(variable, handler);
object.a;
```

### Pass

```js
function positiveProperty(target, key) {
  return Math.min(target[key], 0);
}
positiveProperty(object, 'a');
```
