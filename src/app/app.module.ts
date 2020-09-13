import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';

import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { SignupComponent } from './signup/signup.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ChatComponent,
		MessageComponent,
		SignupComponent,
		LoadingComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [
		AuthService,
		SocketService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
