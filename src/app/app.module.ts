import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';

import { AuthService } from './shared/auth.service';
import { SocketService } from './shared/socket.service';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SignupComponent } from './signup/signup.component';
import { LoadingComponent } from './loading/loading.component';
import { GlobalComponent } from './chat/global/global.component';
import { SidebarComponent } from './chat/sidebar/sidebar.component';
import { PersonalComponent } from './chat/personal/personal.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './chat/contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { ContactService } from './shared/contact.service';
import { AuthGuard } from './shared/auth.guard';
import { ConversationComponent } from './chat/personal/conversation/conversation.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ChatComponent,
		MessageComponent,
		SignupComponent,
		LoadingComponent,
		GlobalComponent,
		SidebarComponent,
		PersonalComponent,
		ProfileComponent,
		ContactComponent,
		HeaderComponent,
		ConversationComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		JwtModule.forRoot({
			config: { tokenGetter: () => localStorage.getItem('token') }
		}),
		HttpClientModule
	],
	providers: [
		AuthService,
		SocketService,
		ContactService,
		AuthGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
