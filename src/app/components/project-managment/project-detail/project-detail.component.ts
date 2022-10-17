import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/common/models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project: Project = new Project('','','','',[],[]);

  @Input() set selectedProject(project:Project){
    if(!project) return;
    this.project = new Project(project.id,project.title,project.subtitle,project.description,project.tickets,project.users);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
