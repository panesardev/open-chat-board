import { Contact } from './contact.interface';

export interface User {
	id?: string;
	firstName?: string;
	lastName?: string;
	username?: string;
	password?: string;
	contacts?: Contact[];
}

