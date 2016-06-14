# Forbid the use of `this`

When doing functional programming, you want to avoid having stateful objects and instead use simple JavaScript objects.

### Fail

```js
let a = 1;
let b = 2,
    c = 3;
let d;
```

### Pass

```js
const a = 1;
const b = 2,
      c = 3;
```
