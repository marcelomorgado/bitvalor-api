'use strict';
var expect = require('chai').expect;
var BitValor = require('../dist/index.js');

describe('BitValor API test', () => {

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
		});
});
