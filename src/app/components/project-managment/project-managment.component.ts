import { Component, OnInit } from '@angular/core';
import { first, from, last, map, Observable, of, take, takeLast, takeUntil, takeWhile, tap, toArray } from 'rxjs';
import { Project } from 'src/app/common/models/project';
import { ProjectService } from 'src/app/common/services/project.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/common/models/user';
import { serverTimestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { AuthService } from 'src/app/common/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-managment',
  templateUrl: './project-managment.component.html',
  styleUrls: ['./project-managment.component.scss'],
})
export class ProjectManagmentComponent implements OnInit {
  projects$!: Observable<any>;
  selectedProject: any;
  currentUser: any ;

  constructor(private projectService:ProjectService, private store: AngularFirestore, public matDialog: MatDialog, public authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.authService.currentProject = null;
    this.authService.currentTicket = null;
    
    this.authService.currentUser$.pipe(first()).subscribe(x=> {
    this.currentUser = x;
    this.projects$ = this.projectService.getUserProjects(x!.uid).pipe(tap(x=>{
      
      this.selectedProject = x[0];
    }));
  
  });
  }

  selectProject(project:Project){
    this.selectedProject = project;
  }

  sendEmail(email:any){
    this.projectService.sendInvitation(email).subscribe(response=>{
      if(response.error){
        this.snackBar.open(response.code, "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
      }else{
        this.snackBar.open(response.code, "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
      }
      
    });
  }

  editUsers(update: any){
    this.projectService.updateUsers(update);
    this.authService.currentUser$.subscribe(x=> {
      this.projects$ = this.projectService.getUserProjects(x!.uid).pipe(tap((x:any)=>{        
        this.selectedProject = x.find((x:any)=> x.id == this.selectedProject?.id);
      }));
    })

  }

  editProject(project: any){
    this.openDialog(project);
  }

  openDialog(project?: any){
    let dialogInstance = this.matDialog.open(ProjectDialogComponent); 
    dialogInstance.componentInstance.inputProject = project;
    dialogInstance.componentInstance.modifiedProject.subscribe((x:any)=> {
      this.projectService.saveProject(x.value, this.currentUser, x.editMode).subscribe(response=>{

        if(response.error){
          this.snackBar.open(response.code, "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
        }else{
          this.projects$ = this.projectService.getUserProjects(this.currentUser.uid).pipe(tap((x:any)=>{
            if(x){
              if(this.selectedProject){
                this.selectedProject = x.find((x:any)=> x.id == this.selectedProject.id);
              }
            }else{
              this.selectedProject = null;
            }
          }));
          this.snackBar.open(response.code, "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
        }
        
        });
    });
  }

}

