import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagmentComponent } from './components/project-managment/project-managment.component';

const routes: Routes = [
  {path: "project-management", component: ProjectManagmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
