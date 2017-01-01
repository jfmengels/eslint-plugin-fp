# Forbid the use of [`Object.assign()`] with a variable as first argument

[`Object.assign()`] is a method that mutates its first argument. In order to use this method as a non-mutating method, the first element may not be a variable (even if declared using `const`), and should therefore be a static value, such as an object expression.

### Fail

```js
var a = {foo: 1, bar: 2};
var b = {bar: 3};
Object.assign(a, b);
```

### Pass

```js
var a = {foo: 1, bar: 2};
var b = {bar: 3};
Object.assign({}, a, b);
Object.assign({foo: 1, bar: 2}, b);
Object.assign(function foo() {}, {propTypes: {}});
```

[`Object.assign()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
