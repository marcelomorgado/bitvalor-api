# bitvalor-api
A [BitValor API](http://bitvalor.com/api) Node.js module

## Installation
```sh
npm install bitvalor-api
```

### ES5
```javascript
var BitValor = require('bitvalor-api').BitValor;
BitValor.exchanges().then(console.log);
```

### ES6
```javascript
import { BitValor } from 'bitvalor-api';
BitValor.exchanges().then(console.log);
```

## Test
```sh
npm run test
```
