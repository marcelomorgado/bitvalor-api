
import axios from 'axios';
declare const Promise: any;

const BITVALOR_URL: string = 'https://api.bitvalor.com';
const BITVALOR_VERSION: string = 'v1';

function fetchJson(url: string): Promise<any> {
	return new Promise((resolve: any, reject: any) => {
		axios.get(url)
		 .then((response) => {
			 resolve(response.data);
		 }).catch(function (error) {
			 reject(error);
		 });
	});
}

function fetch(path: string): Promise<any> {
	return fetchJson(BITVALOR_URL + '/' + BITVALOR_VERSION + path);
}

class BitValorAPI {

	constructor() {}

	public ticker(): Promise<any> {
		return fetch('/ticker.json');
	}

	public exchanges(): Promise<any> {
		return fetch('/exchanges.json');
	}

	public orderBookStats(): Promise<any> {
		return fetch('/order_book_stats.json');
	}

	public orderBook(): Promise<any> {
		return fetch('/order_book.json');
	}
}

export const BitValor = new BitValorAPI();
