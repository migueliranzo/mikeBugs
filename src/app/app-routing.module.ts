import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagmentComponent } from './components/project-managment/project-managment.component';
import { ticketListComponent } from './components/ticket-list/ticket-list.component';

const routes: Routes = [
  {path: "project-management", component: ProjectManagmentComponent},
  {path: "ticket-list",component: ticketListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
