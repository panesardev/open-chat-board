import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

@Component({
	selector: 'chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	user: User = {} as User;

	constructor(private auth: AuthService) { }

	ngOnInit(): void {
		this.user = this.auth.user;
	}

}
