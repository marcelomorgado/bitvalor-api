# bitvalor-api
A [BitValor](http://bitvalor.com/) Node.js module

## Installation
```sh
npm install bitvalor-api
```

### Javascript
```javascript
var BitValor = require('bitvalor-api').BitValor;
BitValor.exchanges().then(console.log);
```
```sh
Output should be 'Boys'
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
