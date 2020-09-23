import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.interface';

@Component({
	selector: 'chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	user: User = {} as User;

	constructor(private auth: AuthService) { }

	async ngOnInit(): Promise<void> {
		this.user = this.auth.user;
	}

}
