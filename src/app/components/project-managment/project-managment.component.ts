import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/common/models/project';

@Component({
  selector: 'app-project-managment',
  templateUrl: './project-managment.component.html',
  styleUrls: ['./project-managment.component.scss'],
})
export class ProjectManagmentComponent implements OnInit {
  projects: Project[] = [];
  test: any = [
    { name: 'Test', completed: true },
    { name: 'mike', completed: true },
    { name: 'habibi', completed: false },
  ];
  usersTest: any = [];
  selectedProject: any;

  constructor() {}

  ngOnInit(): void {
    let testProject: Project = new Project(
      '0',
      'Shiba Inu',
      'Dog Breed',
      'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      this.test,
      this.usersTest
    );
    let testProject1: Project = new Project(
      '1',
      'Shiba Inu',
      'Dog Breed',
      'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      this.test,
      this.usersTest
    );
    let testProject2: Project = new Project(
      '2',
      'Shiba Inu',
      'Dog Breed',
      'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      this.test,
      this.usersTest
    );
    let testProject3: Project = new Project(
      '3',
      'Shiba Inu',
      'Dog Breed',
      'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
      this.test,
      this.usersTest
    );
    
    this.projects.push(testProject,testProject1,testProject2,testProject3);
  }

  openProject(project:Project){
    this.selectedProject = project;
  }
  
}
