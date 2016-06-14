# Forbid the use of `class`

Classes are nice tools to use when programming with the object-oriented paradigm, as they hold internal state and give access to methods on the instances. In functional programming, having stateful objects is more harmful than helpful, and should be replaced by the use of pure functions.

### Fail

```js
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

### Pass

```js
function polygon(height, width) {
  return {
    height: height,
    width: width
  };
}
```
