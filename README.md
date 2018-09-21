# bitvalor-api
A [BitValor API](http://bitvalor.com/api) Node.js module

## Installation
```sh
npm install bitvalor-api
```

### Usage
```javascript
var BitValor = require('bitvalor-api');

// Last Bitcoin price
BitValor.ticker().then(t => {
	let last = t.ticker_24h.total.last;
	return last;
}).then(console.log);

// Cheapest maker order fee among all exchanges
BitValor.exchanges().then(exchanges => {
	let cheapest = { exchange: undefined, price: undefined };

	for(let e in exchanges) {
		let ex = String(e);
		let p = exchanges[e].fees.trade_book[0];

		if(cheapest.price == undefined || p < cheapest.price) {
			cheapest.exchange = ex;
			cheapest.price = p;
		}
	}

	return cheapest;

}).then(console.log);
```

## Test
```sh
npm run test
```
