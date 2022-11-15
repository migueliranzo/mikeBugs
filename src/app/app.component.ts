import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mikeBugs';
  links = [
    {name: "Dashboard", url: '/dashboard', icon: "dashboard" },
    {name: "My Tickets", url: '/my-tickets', icon: "receipt_long"},
    {name: "Projects", url: '/project-management', icon: "edit_document"},
  ]

  showTop: boolean = false;
  showLeft: boolean = false;

  invites$: Observable<any[]> | null = null;

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
  ngOnInit(): void {
    
    if(this.auth.currentUser$){
      this.auth.currentUser$.subscribe( x=>
        this.invites$ =  this.auth.getUserInvitations()
      )
    }
  }

  acceptInvite(invite: any){

    this.auth.acceptProjectInvite(invite);
  }

    logOut(){
      console.log("exit");
      this.router.navigateByUrl("/login")
      this.auth.logout();
    }

}
