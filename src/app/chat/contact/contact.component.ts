import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/contact.interface';
import { ContactService } from 'src/app/shared/contact.service';

@Component({
	selector: 'contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	@Input() contact: Contact;

	show = false;

	constructor(private contactService: ContactService) { }

	ngOnInit(): void {
	}

	async delete(): Promise<void> {
		const isDone = await this.contactService.delete(this.contact.id);
		if (!isDone) { alert('Failed to delete contact, try again.'); }
		window.location.reload();
	}

}
