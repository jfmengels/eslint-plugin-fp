# Forbid the use of loops

Loops, such as `for` or `while` loops, work well when using a procedural paradigm. In functional programming, recursion or implementation agnostic operations like `map`, `filter` and `reduce` are preferred.

### Fail

```js
const result = [];
const elements = [1, 2, 3];

for (let i = 0; i < elements.length; i++) {
  if (elements[i] > 2) {
    result.push(elements[i]);
  }
}

for (element in elements) {
  result.push(element * 10);
}

for (element of elements) {
  result.push(element * 10);
}

while (n < 100) {
  result.push(n);
  n *= 2;
}

do {
  result.push(n);
  n *= 2;
} while (n < 100);
```

### Pass

```js
const elements = [1, 2, 3];

const result = elements.filter(element => element > 2);

const result = elements.map(element => element * 10);

function doubleThemAll(n) {
  if (n >= 100) {
    return [];
  }
  return [n].concat(doubleThemAll(n * 2));
}
const result = doubleThemAll(n);
```
