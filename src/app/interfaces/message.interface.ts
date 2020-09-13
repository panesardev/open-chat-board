export interface Message {
	username: string;
	text: string;
	date: string;
	type?: 'join' | 'left' | 'default';
}
