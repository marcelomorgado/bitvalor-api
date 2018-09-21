import axios from 'axios';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

declare const Promise: any;

const adapter = new FileSync('db.json')
const db = low(adapter)

const BITVALOR_URL: string = 'https://api.bitvalor.com';
const BITVALOR_VERSION: string = 'v1';

function fetchJson(url: string): Promise<any> {
	return new Promise((resolve: any, reject: any) => {
		axios.get(url)
		 .then((response) => {
			 resolve(response.data);
		 }).catch((error) => {
			 reject(error);
		 });
	});
}

function fetch(path: string): Promise<any> {
	return fetchJson(BITVALOR_URL + '/' + BITVALOR_VERSION + path);
}

class BitValorAPI {

	private intervalTime: number = 60*1000;

	constructor() {
		if(db.getState() == {}) {
			db.defaults({
				lastFetch: this.now(),
				ticker: {},
				exchanges: {},
				orderBookStats: {},
				orderBook: {}
			}).write();
		}
	}

	private now(): number {
		return new Date().getTime();
	}

	private shouldGoCache(): boolean {
		let last = db.get('lastFetch').value();
		return (last + this.intervalTime) > this.now();
	}

	private doCall(path: string): Promise<any> {
		return new Promise((resolve: any, reject: any) => {
			let current = db.get('ticker').value();
			let doRequest = !this.shouldGoCache() || current == {};

			if(doRequest) {
				fetch(path).then((json) => {
					db.set('lastFetch', <any>this.now()).write();
					db.set('ticker', <any>json).write();
					resolve(json);
				}).catch((error) => {
					reject(error);
				});
			} else {
				resolve(current);
			}
		});
	}

	public ticker(): Promise<any> {
		return this.doCall('/ticker.json');
	}

	public exchanges(): Promise<any> {
		return this.doCall('/exchanges.json');
	}

	public orderBookStats(): Promise<any> {
		return this.doCall('/order_book_stats.json');
	}

	public orderBook(): Promise<any> {
		return this.doCall('/order_book.json');
	}
}

export = new BitValorAPI();
