import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  links = [
    {name: "Profile", url: '/user-profile/settings', icon: "person" },
    {name: "Invitations", url: '/user-profile/invitations', icon: "mail"},
  ]

  ngOnInit(): void {
  }

}
