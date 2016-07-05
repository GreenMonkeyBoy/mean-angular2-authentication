// GLOBAL IMPORT
import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Subscription} from "rxjs/Rx";
import {JwtHelper} from 'angular2-jwt';

// SERVICES IMPORT
import {AuthService} from './../auth/auth.service';

@Component({
	selector: 'my-private',
	templateUrl: 'app/private/private.component.html',
	providers: []
})

export class PrivateComponent implements OnInit{ 

	isLogged: boolean; // if user is logged or not

	jwtHelper: JwtHelper = new JwtHelper();
	token: string;
	tokenDecoded: Object;
	tokenEmail: string;

	constructor(private authService: AuthService){}

	ngOnInit(){
		this.isLogged = this.authService.isAuthenticate();
		if(this.isLogged){ // if user is logged
			this.token = localStorage.getItem('token');
			this.tokenDecoded = this.jwtHelper.decodeToken(this.token);
			this.tokenEmail = this.tokenDecoded['email'];
		}
	}
}
