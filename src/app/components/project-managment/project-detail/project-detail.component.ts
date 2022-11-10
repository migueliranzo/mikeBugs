import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Project } from 'src/app/common/models/project';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  displayedColumns: string[] = [];
  roles?: any[] = environment.roles;
  viewMode: boolean = true;
  currentProject: { id: string; title: string; subtitle: string; description: string; tickets: any; users: any; } | undefined;

  @Input() currentUser: any;
  @Input() set selectedProject(project:Project){
    if(!project) return;
    this.viewMode = true;
    this.displayedColumns = ['name', 'role'];
    this.currentProject = {...project, users: [...project.users]};
    
  }

  @Output() sendEmail:EventEmitter<any> = new EventEmitter();

  emailFormControl = new FormControl('', [Validators.required, Validators.email, this.alreadyInvited()]);
  matcher = new ErrorStateMatcher();


  constructor(private router:Router, public matDialog: MatDialog) {  }


  editMode(){
    this.viewMode = !this.viewMode;
    if(this.displayedColumns.find(x=> x == "remove")){
      this.displayedColumns.pop();
    }else{
      this.displayedColumns.push("remove");
    }
  }

  addMemeber(ref: TemplateRef<any>){
    this.emailFormControl.reset();
    this.matDialog.open(ref);
  }

  removeMember(){

  }

  goToProjectView(){
    this.router.navigate(["/ticket-list", { filter: this.currentProject?.id }])
  }

  alreadyInvited(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.checkIfMember(this.currentProject?.users, control.value)){
        
        return null;
      }else{
        return {mailmatch: {value: control.value}};
      }
    };
  }

  checkIfMember(users: any[any], mail:string){
    if(users == undefined){
      return false;
    };
    for (const user of users) {
      if(user.email === mail ){
        console.log(user.email, mail, "repeat");
        
        return false
      }
    }
    return true;
  }


}
