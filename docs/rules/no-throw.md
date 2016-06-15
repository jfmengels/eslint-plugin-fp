# Forbid the use of `throw`

Instead of throwing an error, return an object containing the description of the error, or use a tool like `Either` that you can find in some functional libraries.

### Fail

```js
function throwAnError() {
  throw new Error('some error message');
}
```

### Pass

```js
function returnAnError() {
  return Either.Left(new Error('some error message'));
}
```
