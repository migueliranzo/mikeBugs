import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Project } from 'src/app/common/models/project';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/common/services/auth.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})



export class ProjectDetailComponent {
  displayedColumns: string[] = [];
  roles?: any[] = environment.roles;
  viewMode: boolean = true;
  currentProject: Project | undefined;

  changes: {[key: string]: any} = {updates: {}};

  hideHistory: boolean = false;
  
  dataSource!: MatTableDataSource<any>;

  @Input() currentUser: any;
  @Input() set selectedProject(project:Project){
    if(!project) return;
    this.hideHistory = true;
    this.viewMode = true;
    this.displayedColumns = ['name', 'role'];
    this.currentProject = project;
    this.changes = {...this.changes, projectId: project.id}
    this.dataSource = new MatTableDataSource(project.users)
  }

  @Output() sendEmail:EventEmitter<any> = new EventEmitter();
  @Output() editUsers: EventEmitter<any> = new EventEmitter();

  emailFormControl = new FormControl('', [Validators.required, Validators.email, this.alreadyInvited()]);
  matcher = new ErrorStateMatcher();


  constructor(private router:Router, public matDialog: MatDialog, public auth: AuthService) {  }


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

  removeMember(event:any, user:any){
    this.addPropery(user, event.checked, "cheked");
  }

  changeRole(value:any, user:any){
    this.addPropery(user, value, "role")
  }

  addPropery( user:any, property: string, keyName:string){
    if(this.changes["updates"].hasOwnProperty(user.email)){
      if(this.changes["updates"][user.email].hasOwnProperty(property)){
        this.changes["updates"][user.email][keyName] =  property; 
      }else{
        this.changes["updates"][user.email] = { ...this.changes["updates"][user.email] ,[keyName]: property};
      }
    }else{
      this.changes["updates"][user.email] = { ...this.changes["updates"][user.email] ,[keyName]: property};
    }
  }

  saveChanges(){ 
    this.editUsers.emit(this.changes)
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
        return false
      }
    }
    return true;
  }

  getUserRole(){
    return this.currentProject!.users?.find((x: any)=> (x.email == this.currentUser.email)).role;
  }

  inviteDemoUser(){

    this.auth.inviteDemoUser(this.currentProject?.id);
  }

  formatDate(date:any){
    const today = new Date(date.seconds*1000);
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd:any = today.getDate();
    
    let h: any = today.getHours()
    let mins: any = today.getMinutes()

    if (mins < 10) mins = '0' + mins;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (h < 10) h = '0' + h;

    return  (dd + '/' + mm + '/' + yyyy + " " + h + ":" + mins);
  }


}
