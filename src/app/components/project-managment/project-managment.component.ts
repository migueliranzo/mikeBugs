import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from 'src/app/common/models/project';
import { ProjectService } from 'src/app/common/services/project.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/common/models/user';
import { serverTimestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
  selector: 'app-project-managment',
  templateUrl: './project-managment.component.html',
  styleUrls: ['./project-managment.component.scss'],
})
export class ProjectManagmentComponent implements OnInit {
  projects$!: any;
  selectedProject: any;

  constructor(private projectService:ProjectService, private store: AngularFirestore, public matDialog: MatDialog) {}

  ngOnInit(): void {

 
    this.store.collection("user").valueChanges().subscribe(x => console.log(x));
    this.projects$ = this.projectService.getAllProjects().valueChanges(); 
  }

  openProject(project:Project){
    this.selectedProject = project;
  }


  openDialog(){
    let dialogInstance = this.matDialog.open(ProjectDialogComponent); 
    dialogInstance.componentInstance.modifiedProject.subscribe(x=> this.selectedProject = x);
  }

}

