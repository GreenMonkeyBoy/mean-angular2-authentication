// GLOBAL IMPORTS
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {AuthHttp,AuthConfig} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {enableProdMode} from '@angular/core';

// COMPONENTS IMPORT
import {AppComponent} from './app.component';

// SERVICES IMPORT
import {AuthService} from './auth/auth.service';

//enableProdMode();

bootstrap(AppComponent, 
	[
		APP_ROUTER_PROVIDERS, 
		HTTP_PROVIDERS,
		AuthService,
		provide(AuthConfig, {useValue:  new AuthConfig()})
		
	]).catch(err => console.error(err)); 