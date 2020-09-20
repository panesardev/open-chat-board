import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.interface';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	loginUser: User = {} as User;
	loginError: boolean;
	loading: boolean;

	constructor(
		private auth: AuthService,
		private router: Router
	) { }

	async login(): Promise<void> {
		this.loading = true;
		try {
			await this.auth.login(this.loginUser.username, this.loginUser.password);
			this.router.navigate(['/dashboard']);
		} catch (e) {
			console.log(e);
			this.loginError = true;
		}
		this.loading = false;
	}


}
