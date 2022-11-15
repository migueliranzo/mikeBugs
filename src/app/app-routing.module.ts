import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagmentComponent } from './components/project-managment/project-managment.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { ticketListComponent } from './components/ticket-list/ticket-list.component';
import {LoginComponent} from './components/login/login.component'

const routes: Routes = [
  {path: "project-management", component: ProjectManagmentComponent},
  {path: "ticket-list",component: ticketListComponent},
  {path: "my-tickets",component: ticketListComponent},
  {path: "ticket-detail", component: TicketDetailComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
