import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { JwtDto } from '../interfaces/jwt.dto';
import * as moment from 'moment';
import { environment as env } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

	private online: boolean;

	constructor(private http: HttpClient) {}

	async signUp(user: User) {
		this.http.post<User>(`${env.serverUrl}/user`, user);
		await this.login(user.username, user.password);
	}

	async login(username: string, password: string) {
		const body = { username, password };
		const data: JwtDto = await this.http.post<JwtDto>(`${env.serverUrl}/user/login`, body).toPromise();

		const expiresAt = moment().add(data.expire, 'second');
		localStorage.token = data.token;
		localStorage.expire = JSON.stringify(expiresAt.valueOf());

		const user = await this.http.get<User>(`${env.serverUrl}/user/${data.username}`).toPromise();
		localStorage.user = JSON.stringify(user);

		this.online = true;
	}

	get isLoggedIn() {
		return moment().isBefore(this.getExpiration(), 'seconds');
	}

	getExpiration() {
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
