import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/common/models/project';
import { ProjectService } from 'src/app/common/services/project.service';

@Component({
  selector: 'app-project-managment',
  templateUrl: './project-managment.component.html',
  styleUrls: ['./project-managment.component.scss'],
})
export class ProjectManagmentComponent implements OnInit {
  projects$?: Observable<Project[]>;
  selectedProject: any;

  constructor(private projectService:ProjectService) {}

  ngOnInit(): void {

    this.projects$ = this.projectService.getProjects(); 
  }

  openProject(project:Project){
    this.selectedProject = project;
  }
  
}
