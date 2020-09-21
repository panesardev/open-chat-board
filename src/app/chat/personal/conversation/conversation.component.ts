import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/user.interface';
import { Message } from '../../../shared/message.interface';
import { SocketService } from '../../../shared/socket.service';
import { AuthService } from '../../../shared/auth.service';

@Component({
	selector: 'conversation',
	templateUrl: './conversation.component.html',
	styleUrls: ['./conversation.component.scss', '../../chat.component.scss']
})
export class ConversationComponent implements OnInit {

	@Input() receiver: User;
	@Input() user: User;

	input: string;
	messages: Message[] = [];
	showRedBorder = false;
	
	constructor(
		private socket: SocketService,
		private router: Router,
		private auth: AuthService
	) { }

	ngOnInit(): void {
	}

	send(): void {
		if (this.auth.isLoggedIn) {
			if (this.input) { this.socket.sendPersonal(this.input, ''); }
			else { this.showRedBorder = true; }
		} else {
			this.showLoggedOut();
			this.input = '';
		}
	}

	showLoggedOut(): void {
		alert('You have been logged out. Please login again');
		this.router.navigate(['/']);
	}

	scroll(): void {
		this.showRedBorder = false;
		const chat = document.querySelector('#chat-container');
		const lastMessage = chat.children[0].children[chat.children[0].children.length - 1];
		lastMessage.scrollIntoView();
	}

}
