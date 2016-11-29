# Forbid the use of `arguments`

[`arguments`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments) is a special variable made implicitly available in functions, which is an object containing the arguments passed to the function call. This is often used to allow any number of parameters to be passed to a function.

Functional programming works better with known and explicit parameters. Also, having an undefined number of parameters does not work well with currying.

### Fail

```js
function sum() {
  const numbers = Array.prototype.slice.call(arguments);
  return numbers.reduce((a, b) => a + b);
}

sum(1, 2, 3);
```

### Pass

```js
function sum(numbers) {
  return numbers.reduce((a, b) => a + b);
}

sum([1, 2, 3]);

var args = node.arguments;
```
