import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagmentComponent } from './components/project-managment/project-managment.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { ticketListComponent } from './components/ticket-list/ticket-list.component';
import {LoginComponent} from './components/login/login.component'
import { AuthGuardGuard } from './common/guards/auth-guard.guard';
import { ProjectGuardGuard } from './common/guards/project-guard.guard';  

const routes: Routes = [
  {path: "project-management", component: ProjectManagmentComponent,canActivate: [AuthGuardGuard]},
  {path: "ticket-list",component: ticketListComponent,  canActivate: [AuthGuardGuard,ProjectGuardGuard]},
  {path: "my-tickets",component: ticketListComponent, canActivate: [AuthGuardGuard]},
  {path: "ticket-detail", component: TicketDetailComponent, canActivate: [AuthGuardGuard, ProjectGuardGuard]},
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/project-management', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
