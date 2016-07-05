// GLOBAL IMPORT
import {provideRouter, RouterConfig} from '@angular/router';

// COMPONENTS IMPORT
import {HomeComponent} from './home/home.component';
import {SignUpComponent} from './auth/signup/signup.component';
import {SignInComponent} from './auth/signin/signin.component';
import {PrivateComponent} from './private/private.component';

export const routes: RouterConfig = [
	{ path: '', component: HomeComponent },
	{ path: 'private', component: PrivateComponent },
	{ path: 'signup', component: SignUpComponent },
	{ path: 'signin', component: SignInComponent }
]; 

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
]; 