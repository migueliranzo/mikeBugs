import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagmentComponent } from './components/project-managment/project-managment.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { ticketListComponent } from './components/ticket-list/ticket-list.component';
import {LoginComponent} from './components/login/login.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { InvitationsComponent } from './components/user-profile/invitations/invitations.component';
import { SettingsComponent } from './components/user-profile/settings/settings.component';

const routes: Routes = [
  {path: "project-management", component: ProjectManagmentComponent},
  {path: "ticket-list",component: ticketListComponent},
  {path: "ticket-detail", component: TicketDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-profile', component: UserProfileComponent, children : [
    {path: 'invitations', component: InvitationsComponent},
    {path: 'settings', component: SettingsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
