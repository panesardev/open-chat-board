import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	signupUser: User = {} as User;
	signupError: boolean;
	loading: boolean;

	constructor(
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	async signup(): Promise<void> {
		this.loading = true;
		try {
			const user: User = this.validateUser();
			if (!user) { return; }

			await this.auth.signUp(user);
			this.router.navigate(['/dashboard']);
		} catch (e) {
			console.log(e);
		}
		this.loading = false;
	}

	validateUser(): User | null {
		return null;
	}

}
