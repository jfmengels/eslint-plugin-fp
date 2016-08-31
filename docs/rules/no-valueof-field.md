# Forbid the creation of `valueOf` fields

The [`valueOf` field](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) in objects is used to implicitly convert an object to a primitive value.
Having this field overridden can have implicit unwanted results, or introduce side-effects in code that looks pure, as demonstrated in [this article](http://staltz.com/is-your-javascript-function-actually-pure.html).

Here's an example of a use of `valueOf`:

```js
const object1 = {
  value: 15,
  valueOf: function() { return this.value; }
};
const object2 = {
  value: 25,
  valueOf: function() { return this.value; }
};
object1 + object2
// => 40
```

And its more explicit version without the use of `valueOf`:

```js
const addValueOf = (a, b) => a.value + b.value;

const object1 = {
  value: 15
};
const object2 = {
  value: 25
};

addValueOf(object1, object2)
// => 40
```

This rule reports any explicit assignment or creation of a `valueOf` field in an object.

### Fail

```js
const object = { valueOf: Math.random };
const object = { valueOf };
const object = { ["valueOf"]: Math.random };
object.valueOf = Math.random;
object.prototype.valueOf = Math.random;
```

### Pass

```js
const object = { value: 2 };
object.value = 2;
```
