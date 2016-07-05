// GLOBAL IMPORT
import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {Subscription} from "rxjs/Rx";

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent implements OnInit{ 

	isLogged: boolean; // if user is logged or not

	constructor(private router: Router, private authService: AuthService){
		this.authService.authenticateState$.subscribe( 
			state => this.isLogged = state 
		);
	}
	
	// logout user and redirect to home page
	logout(){
		this.authService.logout();
		this.router.navigate(['/']);
	}

	ngOnInit(){
		this.isLogged = this.authService.isAuthenticate();
	}

} 
