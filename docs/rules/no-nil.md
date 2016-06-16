# Forbid the use of `null` and `undefined`

Accessing properties or calling methods of a variable with value `null` or `undefined` is source of a lot of errors. The use of those values is hard to ignore in JavaScript, but avoiding their explicit use in your code may help restrain the number of occurrences of this kind of error.

This rule:
- Prohibits the use of `null` and `undefined` in any way, except in a comparison that directly compares with either value
- Enforces that all variables are initialized, as they would otherwise evaluate to `undefined`
- Enforces that every function returns a value, that is not either value

### Fail

```js
let a; // Equivalent to `let a = undefined;`
let a = null;

// No return statement, so it will return `undefined`
function foo() {}
function foo() {
  a + b;
}

function foo() {
  return null;
}

function foo(a=null) {
  return a;
}

function foo() {
  if (bar) {
    return;
  }
  return 1;
}
```

### Pass

```js
const a = 1;

if (value === null || value === undefined) {}

function foo(a=1) {
  return a;
}

function foo() {
  if (bar) {
    return 2;
  }
  return 1;
}
```
