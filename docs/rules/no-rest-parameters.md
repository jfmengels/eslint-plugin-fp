# Forbid the use of rest parameters

[Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) can be used to allow any number of parameters to be passed to a function.

Functional programming works better with known and explicit parameters. Having an undefined number of parameters does not work well with currying.

### Fail

```js
function sum(...numbers) {
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
```
