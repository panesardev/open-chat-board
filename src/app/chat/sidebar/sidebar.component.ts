import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.interface';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['../chat.component.scss', './sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input() user: User;

	constructor(
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {

	}

	logout(): void {
		this.auth.logout();
		alert('You have been logged out!');
		this.router.navigate(['/home']);
	}

}
