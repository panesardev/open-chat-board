import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class SocketService {

	// explore the socket functions

	private socket: SocketIOClient.Socket;

	constructor(private auth: AuthService) {
		this.socket = io(environment.serverUrl);
	}

	sendGlobal(text: string, join?: boolean, left?: boolean): boolean {
		const date: Date = new Date();
		const type = join ? 'join' : left ? 'left' : 'default';
		text = text[0].toUpperCase() + text.slice(1);

		const message: Message = {
			date: `${date.getUTCHours()}:${date.getUTCMinutes()} UTC`,
			text,
			username: this.auth.user.username,
			type
		};
		this.socket.emit('toServer', message);
		console.log(this.socket.id);
		return true;
	}

	receiveGlobal(): Observable<Message> {
		return Observable.create(observer => {
			this.socket.on('toClient', msg => {
			  	observer.next(msg);
			});
		});
	}

}
