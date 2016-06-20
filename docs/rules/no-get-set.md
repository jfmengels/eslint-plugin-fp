# Forbid the use of getters and setters

The use of JavaScript property getter and setters introduces side-effects and confusion.

### Fail

```js
const person = {
  name: 'Some Name',
  get age() {
    return this._age;
  },
  set age(n) {
    if (n < 0) {
      this._age = 0;
    } else if (n > 100) {
      this._age = 100;
    } else {
      this._age = n;
    }
  }: 20
};
```

### Pass

```js
const person = {
  name: 'Some Name',
  age: 20
};

function clamp(n, min, max) {
  if (n <= min) {
    return min;
  }
  if (n >= max) {
    return max;
  }
  return n;
}

function setAge(age, person) {
  return Object.assign({}, person, {age: clamp(age, 0, 100)});
}
```
