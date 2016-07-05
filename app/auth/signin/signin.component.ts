// GLOBAL IMPORT
import {Component, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

// SERVICES IMPORT
import{AuthService} from './../auth.service';

@Component({
	selector: 'my-signin',
	templateUrl: 'app/auth/signin/signin.component.html'
})

export class SignInComponent { 

	error: string;

	constructor(private router: Router, private authService: AuthService){}

	onSubmit(form){
		this.authService.signin(form.email, form.password)
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
}
