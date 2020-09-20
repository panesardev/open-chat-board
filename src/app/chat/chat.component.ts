import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.interface';
import { ContactService } from '../shared/contact.service';

@Component({
	selector: 'chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	user: User = {} as User;

	constructor(
		private auth: AuthService,
		private contactService: ContactService
	) { }

	async ngOnInit(): Promise<void> {
		this.user = this.auth.user;
		this.user.contacts = await this.contactService.getContacts();
	}

}
