'use strict';
var expect = require('chai').expect;
var BitValor = require('../dist/index.js');

describe('BitValor API test', () => {

	it('readme', async () => {
		let t = await BitValor.ticker();
		let last = t.ticker_24h.total.last;
		console.log(last);


		let exchanges = await BitValor.exchanges();
		let cheapest = { exchange: undefined, price: undefined };

		for(let e in exchanges) {
			let ex = String(e);
			let p = exchanges[e].fees.trade_book[0];

			if(cheapest.price == undefined || p < cheapest.price) {
				cheapest.exchange = ex;
				cheapest.price = p;
			}
		}

		console.log(cheapest)


	});

/*
		it('should return ticker', async () => {
			let t = await BitValor.ticker();
			expect(t.ticker_24h.exchanges.MBT).to.have.property('last');
			expect(t.ticker_24h.exchanges.MBT.last).not.to.be.an('undefined');
		});

    it('should return exchanges', async () => {
				let exchanges = await BitValor.exchanges();
				expect(exchanges).to.have.property('FOX');
        expect(exchanges.FOX.name).to.equal('FoxBit');
    });

		it('should return order book stats', async () => {
				let obs = await BitValor.orderBookStats();
				expect(obs.total).to.have.property('bid');
				expect(obs.total.bid).not.to.be.an('undefined');
		});

		it('should return order book', async () => {
				let ob = await BitValor.orderBook();
				expect(ob).to.have.property('bids');
				expect(ob.bids).to.be.an('array');
		});*/
});
