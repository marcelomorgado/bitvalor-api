import axios from 'axios';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

declare const Promise: any;

const adapter = new FileSync('db.json')
const db = low(adapter)

const BITVALOR_URL: string = 'https://api.bitvalor.com';
const BITVALOR_VERSION: string = 'v1';
const BITVALOR_INTERVAL_TIME: number = 60 * 1000;

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

	private now(): number {
		return new Date().getTime();
	}

	private shouldGoCache(): boolean {
		let last = db.get('lastFetch').value();
		return (last + BITVALOR_INTERVAL_TIME) > this.now();
	}

	private doCall(path: string): Promise<any> {
		return new Promise((resolve: any, reject: any) => {
			let dbParam = path.substring(1, path.length).split('.')[0];
			let current = db.get(dbParam).value();
			let doRequest = !this.shouldGoCache()  || !current || current == {};

			if(doRequest) {
				fetch(path).then((json) => {
					db.set('lastFetch', <any>this.now()).write();
					db.set(dbParam, <any>json).write();
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
