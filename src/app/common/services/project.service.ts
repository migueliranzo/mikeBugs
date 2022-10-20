import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  projects: Project[] = [];
  constructor(private store: AngularFirestore) {}

  getAllProjects(){
    return this.store.collection("projects");
  }

  saveProject(project: any) {
    let newID = this.store.createId();
    this.store.collection("projects").add( {...project, id: newID});
    return newID;
  }



}
