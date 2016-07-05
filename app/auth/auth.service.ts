// GLOBAL IMPORT
import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import 'rxjs/Rx';

Injectable()
export class AuthService{

	// for change the navbar state between online and offline
	private authenticate = new Subject<boolean>();
	authenticateState$ = this.authenticate.asObservable();

	constructor(@Inject(Http) private http: Http){}

	signup(email: string, password: string): Observable<any> {
		return this.http.post('/api/signup', {
			email: email,
			password: password
		})
		.map(res => res.json())
		.catch(error => {
			return Observable.throw(error.json());
		});
	}

	signin(email: string, password: string): Observable<any> {
    	return this.http.post('/api/signin', {
        	email: email,
        	password: password
      	})
	    .map(res => res.json())
	    .catch(error => {
			return Observable.throw(error.json());
		});
	}

	// delete the token in localStorage and change the navbar state
	logout(): void {
      	localStorage.removeItem('token');
      	this.authenticate.next(false);
    }

    // save the token in localStorage and change the navbar state
	saveToken(token: string): void {
		localStorage.setItem('token', token);
		this.authenticate.next(true);
	}

	// return if the user is authenticate
	isAuthenticate(): boolean {
		let isAuth: boolean;
		if(localStorage.getItem('token')){
			isAuth = true;
		}else{
			isAuth = false;
		}
		return isAuth;
	}
		
}