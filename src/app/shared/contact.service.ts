import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Contact } from './contact.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ContactService {

	constructor(
		private auth: AuthService,
		private http: HttpClient
	) { }

	async insert(contact: Contact): Promise<Contact> {
		contact.userId = this.auth.user.id;
		return await this.http.post<Contact>(`${env.serverUrl}/contact`, contact).toPromise();
	}

	async getContacts(): Promise<Contact[]> {
		return await this.http.get<Contact[]>(`${env.serverUrl}/contact/${this.auth.user.id}`).toPromise();
	}

	async delete(id: string): Promise<boolean> {
		return await this.http.delete<boolean>(`${env.serverUrl}/contact/${id}`).toPromise();
	}

}
