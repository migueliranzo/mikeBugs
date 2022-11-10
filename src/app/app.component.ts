import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './common/services/auth.service';

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
    {name: "Projects", url: '/project-management', icon: "edit_document"},
  ]

  showTop: boolean = false;
  showLeft: boolean = false;

  constructor(private router: Router, public auth: AuthService) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login') {
            this.showTop = false;
            this.showLeft = false;
          } else if (event['url'].includes('/user-profile') ) {
            this.showLeft = false;
            this.showTop = true;
          }else{
            this.showTop = true;
            this.showLeft = true;
          }
        }
      });
    }

}
