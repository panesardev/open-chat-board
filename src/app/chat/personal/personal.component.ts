import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { Message } from '../../interfaces/message.interface';
import { Router } from '@angular/router';

@Component({
	selector: 'personal',
	templateUrl: './personal.component.html',
	styleUrls: ['../chat.component.scss']
})
export class PersonalComponent implements OnInit {

	input: string;
	@Input() user: User;
	messages: Message[] = [];

	showRedBorder: boolean = false;

	constructor(
		private socket: SocketService,
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {

	}

	send(): void {
		this.auth.isLoggedIn ?
			this.input ?
				this.socket.sendGlobal(this.input)
			: this.showRedBorder = true
		: this.showLoggedOut();
		this.input = '';
	}

	showLoggedOut(): void {
		alert('You have been logged out. Please login again');
		this.router.navigate(['/']);
	}

}
