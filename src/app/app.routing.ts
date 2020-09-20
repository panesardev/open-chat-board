import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'dashboard', component: ChatComponent, canActivate: [AuthGuard] },
	{ path: 'sign-up', component: SignupComponent },
	{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
