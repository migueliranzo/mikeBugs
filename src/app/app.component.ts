import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mikeBugs';
  links = [
    {name: "Dashboard", url: '/dashboard', icon: "dashboard" },
    {name: "Tickets", url: '/ticket-list', icon: "receipt_long"},
    {name: "Manage projects", url: '/project-management', icon: "edit_document"},
  ]

  loginPage: boolean = false;

  constructor(private router: Router) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login') {
            this.loginPage = false;
          } else {
            this.loginPage = true;
          }
        }
      });
    }

}
