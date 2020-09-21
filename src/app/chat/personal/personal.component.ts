import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/socket.service';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.interface';
import { Message } from '../../shared/message.interface';
import { Router } from '@angular/router';

@Component({
	selector: 'personal',
	templateUrl: './personal.component.html',
	styleUrls: ['../chat.component.scss', './personal.component.scss']
})
export class PersonalComponent implements OnInit {

	@Input() user: User;

	receiver: User;


	constructor(
		private socket: SocketService,
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
	}


}
