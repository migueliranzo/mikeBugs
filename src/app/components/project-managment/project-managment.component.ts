import { Component, OnInit } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { Project } from 'src/app/common/models/project';
import { ProjectService } from 'src/app/common/services/project.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/common/models/user';
import { serverTimestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-project-managment',
  templateUrl: './project-managment.component.html',
  styleUrls: ['./project-managment.component.scss'],
})
export class ProjectManagmentComponent implements OnInit {
  projects$!: Observable<unknown[]>;
  selectedProject: any;
  currentUserId: any ;

  constructor(private projectService:ProjectService, private store: AngularFirestore, public matDialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {

    this.authService.currentUser$.pipe(first()).subscribe(x=> {
    this.currentUserId = x?.uid;
    this.projects$ = this.projectService.getUserProjects(x!.uid);
    });
  }

  selectProject(project:Project){
    this.selectedProject = project;
  }


  openDialog(){
    let dialogInstance = this.matDialog.open(ProjectDialogComponent); 
    dialogInstance.componentInstance.currentUserId = this.currentUserId;
    dialogInstance.componentInstance.modifiedProject.subscribe(x=> this.selectedProject = x);
  }

}

