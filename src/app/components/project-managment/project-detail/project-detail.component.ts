import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/common/models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  displayedColumns: string[] = [];
  roles: any[] = [{value: 0 , viewValue:"Developer"},{value: 1, viewValue: "Project Manager"}, {value:2, viewValue:"Admin"}];
  viewMode: boolean = true;
  currentProject: { id: string; title: string; subtitle: string; description: string; tickets: any; users: any; } | undefined;

  @Input() set selectedProject(project:Project){
    if(!project) return;
    this.viewMode = true;
    this.displayedColumns = ['name', 'role'];
    this.currentProject = project;
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  editMode(){
    this.viewMode = false;
    this.displayedColumns.push("remove");
  }

  addMemeber(){

  }

  removeMember(){

  }

  saveChanges(){

  }

  goToProjectView(){
    this.router.navigate(["/ticket-list", { filter: this.currentProject?.id }])
  }

}
