# Forbid the use of the `events` module

The use of `EventEmitter` with the `events` module provided by Node.js promotes implicit side-effects by emitting and listening to events. Instead of `events`, you should prefer activating the wanted effects by calling the functions you wish to use explicitly.

The rule will simply warn whenever the `events` module is imported.

### Fail

```js
import EventEmitter from 'events';

const EventEmitter = require('events')
```
