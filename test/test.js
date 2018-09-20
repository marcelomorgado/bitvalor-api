'use strict';
var expect = require('chai').expect;
var BitValor = require('../dist/index.js').BitValor;

describe('BitValor API test', () => {

    it('should return exchanges', async () => {
				let exchanges = await BitValor.exchanges();

        expect(exchanges.FOX.name).to.equal('FoxBit');
    });

});
