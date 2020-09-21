import { Injectable } from '@angular/core';
import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { JwtDto } from './jwt.dto';
import * as moment from 'moment';
import { environment as env } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

	private online: boolean;

	constructor(private http: HttpClient) {}

	async signUp(user: User): Promise<User> {
		return await this.http.post<User>(`${env.serverUrl}/user/new`, user).toPromise();
	}

	async login(username: string, password: string): Promise<void> {
		const body = { username, password };
		const data: JwtDto = await this.http.post<JwtDto>(`${env.serverUrl}/user/login`, body).toPromise();

		const expiresAt = moment().add(data.expire, 'second');
		localStorage.token = data.token;
		localStorage.expire = JSON.stringify(expiresAt.valueOf());

		const user = await this.http.get<User>(`${env.serverUrl}/user/${data.username}`).toPromise();
		localStorage.user = JSON.stringify(user);
		this.online = true;
	}

	get isLoggedIn(): boolean {
		return moment().isBefore(this.getExpiration(), 'seconds');
	}

	getExpiration(): moment.Moment {
		const expiration = localStorage.getItem('expire');
		const expiresAt = JSON.parse(expiration);
		return moment(expiresAt);
	}

	logout(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('expire');
		localStorage.removeItem('user');
		this.online = false;
	}

	get isOnline(): boolean {
		return this.online;
	}

	get user(): User {
		return JSON.parse(localStorage.user);
	}

}
