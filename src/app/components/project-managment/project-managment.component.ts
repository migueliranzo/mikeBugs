import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from 'src/app/common/models/project';
import { ProjectService } from 'src/app/common/services/project.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/common/models/user';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-project-managment',
  templateUrl: './project-managment.component.html',
  styleUrls: ['./project-managment.component.scss'],
})
export class ProjectManagmentComponent implements OnInit {
  projects$?: Observable<Project[]>;
  selectedProject: any;

  constructor(private projectService:ProjectService, private store: AngularFirestore) {}

  ngOnInit(): void {

    let stuff = this.store.collection("user");
    let newId = this.store.createId();
    let testUser:User = {
      id:newId,
      email: "test@ghmail",
      username: "yeeea",
      createdAt: serverTimestamp(),
    }

    stuff.add(testUser)
    this.store.collection("user").valueChanges().subscribe(x => console.log(x));
    this.projects$ = this.projectService.getProjects(); 
  }

  openProject(project:Project){
    this.selectedProject = project;
  }
  
}

