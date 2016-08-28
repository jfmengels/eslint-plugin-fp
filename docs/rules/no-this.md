# Forbid the use of `this`

When doing functional programming, you want to avoid having stateful objects and instead use simple JavaScript objects.

### Fail

```js
const object = {
  numbers: [1, 2, 3],
  sum: function() {
    return this.numbers.reduce((a, b) => a + b, 0);
  }
}

object.sum();
```

### Pass

```js
function sum(numbers) {
  return numbers.reduce((a, b) => a + b);
}

sum([1, 2, 3]);
```
