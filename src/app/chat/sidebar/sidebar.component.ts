import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['../chat.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input() user: User;

	constructor() { }

	ngOnInit(): void {
	}

}
