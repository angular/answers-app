/// <reference path="../../../typings/tsd.d.ts" />

import * as Firebase from 'firebase'
//var Firebase = require("Firebase");
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';

export class BackendConfig {
	url: string;
}

@Injectable()
export class Backend {
	authState: ReplaySubject<any> = new ReplaySubject(1);
	ref: Firebase;
	constructor(config: BackendConfig){
    try {
      this.ref = new Firebase.default(config.url);
    } catch(e) {
      console.error('something went wrong', config.url, e);
    }
	}
	authenticate(){
		let authRequest = new Observable(obs => {
			this.ref.authWithOAuthPopup('github', (err, res) => {
				if(err){
					obs.error(err);
				}
				else {
					obs.next(res);
				}
			})

		});

		authRequest.subscribe(this.authState);

	}
}
