// GLOBAL IMPORT
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// SERVICES IMPORT
import{AuthService} from './../auth.service';

@Component({
	selector: 'my-signup',
	templateUrl: 'app/auth/signup/signup.component.html'
})

export class SignUpComponent { 

	error: string; // the possible error message when signup

	constructor(private router: Router, private authService: AuthService){}

	// signin the new user if signup successfully
	signin(email: string, password: string){
		this.authService.signin(email, password)
			.subscribe(
				res => {
					if(res.success){
						this.authService.saveToken(res.token);
						this.router.navigate(['/']);
					}else{
						this.error = res.msg;
					}
				}
			)
	}

	// create the new user
	signup(form){
		this.authService.signup(form.email, form.password)
			.subscribe(
				res => {
					if(res.success){ // if user created successfully
						// signin the new user
						this.signin(form.email, form.password);
					}else{
						this.error = res.msg;
					}
				}
			)
	}

}
