import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mikeBugs';
  links = [
    {name: "Dashboard", url: '/dashboard', icon: "dashboard" },
    {name: "Ticket list", url: '/ticket-list', icon: "format_list_bulleted" },
    {name: "Manage projects", url: '/project-management', icon: "edit_document"},
  ]

}
