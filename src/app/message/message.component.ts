import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../shared/message.interface';

@Component({
	selector: 'message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

	@Input() message: Message;
	@Input() me: boolean;

	constructor() {}

	ngOnInit(): void {
	}

}
