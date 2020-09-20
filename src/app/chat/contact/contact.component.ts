import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/contact.interface';
import { SocketService } from '../../shared/socket.service';

@Component({
	selector: 'contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	@Input() contact: Contact;

	constructor(private socket: SocketService) { }

	ngOnInit(): void {
	}



}
