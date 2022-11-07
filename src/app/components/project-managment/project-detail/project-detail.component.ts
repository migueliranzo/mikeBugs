import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Project } from 'src/app/common/models/project';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  displayedColumns: string[] = [];
  roles?: any[] = environment.roles;
  viewMode: boolean = true;
  currentProject: { id: string; title: string; subtitle: string; description: string; tickets: any; users: any; } | undefined;


  @Input() set selectedProject(project:Project){
    if(!project) return;
    this.viewMode = true;
    this.displayedColumns = ['name', 'role'];
    this.currentProject = {...project, users: [...project.users]};
    
  }

  @Output() sendEmail:EventEmitter<any> = new EventEmitter();

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();


  constructor(private router:Router, public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

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

  saveChanges(){

  }

  goToProjectView(){
    this.router.navigate(["/ticket-list", { filter: this.currentProject?.id }])
  }

}
