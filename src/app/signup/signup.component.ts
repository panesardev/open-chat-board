import { Component } from '@angular/core';
import { User } from '../shared/user.interface';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

	signupUser: User = {} as User;
	signupError: boolean;
	loading: boolean;
	passwordError = false;

	constructor(
		private auth: AuthService,
		private router: Router
	) { }

	async signup(): Promise<void> {
		this.loading = true;
		if (!this.validateUser())  {
			this.passwordError = true;
		} else {
			try {
				await this.auth.signUp(this.signupUser);
				alert('Your account has been created now log in to continue');
				this.router.navigate(['/dashboard']);
			} catch (e) {
				console.log(e);
				this.signupError = true;
			}
		}
		this.loading = false;
	}

	validateUser(): boolean {
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
		return regex.test(this.signupUser.password);
	}

}
