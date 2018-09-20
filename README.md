# bitvalor-api
A [BitValor API](http://bitvalor.com/api) Node.js module

## Installation
```sh
npm install bitvalor-api
```

### Javascript
```javascript
var BitValor = require('bitvalor-api').BitValor;
BitValor.exchanges().then(console.log);
```

### TypeScript
```typescript
import { BitValor } from 'bitvalor-api';
BitValor.exchanges().then(console.log);
```

## Test
```sh
npm run test
```
