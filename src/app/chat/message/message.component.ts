import { Component, Input } from '@angular/core';
import { Message } from '../../shared/message.interface';

@Component({
	selector: 'message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss']
})
export class MessageComponent {

	@Input() message: Message;
	@Input() me: boolean;

}
