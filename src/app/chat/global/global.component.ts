import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/shared/message.interface';
import { User } from 'src/app/shared/user.interface';
import { AuthService } from 'src/app/shared/auth.service';
import { SocketService } from 'src/app/shared/socket.service';

@Component({
	selector: 'global',
	templateUrl: './global.component.html',
	styleUrls: ['../chat.component.scss', './global.component.scss']
})
export class GlobalComponent implements OnInit {

	@Input() user: User;
	messages: Message[] = [];
	input: string;

	showRedBorder = false;
	globalChat = true;

	private subscription: Subscription;

	constructor(
		private socket: SocketService,
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
		if (this.auth.isLoggedIn) {
			this.socket.sendGlobal('Joined', true, false);
			this.subscription = this.socket.receiveGlobal().subscribe(
				(message: Message) => this.messages.push(message),
				(error) => console.log(error)
			);
		} else { this.showLoggedOut(); }
	}

	send(): void {
		if (this.auth.isLoggedIn) {
			if (this.input) { this.socket.sendGlobal(this.input); }
			else { this.showRedBorder = true; }
		} else {
			this.showLoggedOut();
			this.input = '';
		}

	}

	@HostListener('window:beforeunload')
	leave(): void {
		if (this.globalChat) {
			this.subscription.unsubscribe();
			this.socket.sendGlobal('Left', false, true);
			this.globalChat = false;
		}
	}

	join(): void {
		this.ngOnInit();
		this.globalChat = true;
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
