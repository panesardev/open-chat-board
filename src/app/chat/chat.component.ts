import { Component, OnInit, HostListener } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Message } from '../interfaces/message.interface';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	user: User = {} as User;
	messages: Message[] = [];
	input: string;

	showRedBorder = false;
	globalError = false;

	private globalSubscription: Subscription;

	constructor(
		private socket: SocketService,
		private auth: AuthService,
		private router: Router
	) {	}

	ngOnInit(): void {
		this.auth.isLoggedIn ?
			this.socket.sendGlobal('Joined', true, false) ?
				this.joinGlobal()
			: this.globalError = true
		: this.showLoggedOut();
	}

	send(): void {
		this.auth.isLoggedIn ?
			this.input ?
				this.socket.sendGlobal(this.input)
				: this.showRedBorder = true
			: this.showLoggedOut();
		this.input = '';
	}

	@HostListener('window:beforeunload')
	leaveGlobal(): void {
		this.socket.sendGlobal('Left', false, true);
		this.globalSubscription.unsubscribe();
	}

	joinGlobal(): void {
		this.globalSubscription = this.socket.receiveGlobal()
		.subscribe((message: Message) => {
			this.messages.push(message);
			this.user = this.auth.user;
		});
	}

	showLoggedOut(): void {
		alert('You have been logged out. Please login again');
		this.router.navigate(['/']);
	}

	scroll(): void {
		this.showRedBorder = false;
		const chat = document.querySelector('#chat-container');
		const lastMessage = chat.children[chat.children.length - 1];
		lastMessage.scrollIntoView();
	}

}
