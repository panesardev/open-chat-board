import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.interface';
import { AuthService } from 'src/app/shared/auth.service';
import { ContactService } from 'src/app/shared/contact.service';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['../chat.component.scss', './sidebar.component.scss']
})
export class SidebarComponent {

	@Input() user: User;
	viewAdd = false;
	contactName: string;
	error = false;
	youCantAddYou = false;

	constructor(
		private auth: AuthService,
		private contactService: ContactService,
		private router: Router
	) { }

	async addContact(): Promise<void> {
		try {
			if (this.auth.user.username === this.contactName) {
				this.youCantAddYou = true;
			} else {
				await this.contactService.insert({ name: this.contactName });
				window.location.reload();
			}
		} catch (e) {
			console.log(e);
			this.youCantAddYou = false;
			this.error = true;
		}
	}

	closeModal(event: any): void {
		if (event.target !== event.currentTarget) { return; }
		this.viewAdd = false;
	}

	logout(): void {
		this.auth.logout();
		alert('You have been logged out!');
		this.router.navigate(['/home']);
	}

}
