# Forbid the use of `let`

If you want to program as if your variables are immutable, part of the answer is to not allow your variables to be reassigned. By not allowing the use of `let` and `var`, variables that you declared may not be reassigned.

This rule does not forbid the use the use of `var`, but you should forbid that by turning on the [`no-var` core rule](http://eslint.org/docs/rules/no-var).

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
