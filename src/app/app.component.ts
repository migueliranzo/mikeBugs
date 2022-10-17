import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mikeBugs';
  links = [
    {name: "Dashboard", url: '/', icon: "dashboard" },
    {name: "Project status", url: '/project', icon: "folder" },
  ]

}
