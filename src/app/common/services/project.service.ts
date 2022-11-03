import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { every, map, switchMap, tap } from 'rxjs/operators';
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

  getUserProjects(id:string){
  let projects:any[] = [];

  this.store.collection("user-project", ref=> ref.where("uid", "==", id)).get().forEach(x=> {

    for (const element of x.docs.values()) {
      this.store.collection("projects").doc(element.get("projectId")).valueChanges().subscribe(x=> x != undefined? projects.push(x) : null);
      }
    });
    
    return of(projects);
    

  }

  saveProject(project: any, ownerId: string) {
    this.store.collection("projects").add(project).then(x=> {
      this.store.collection("projects").doc(x.id).update({id:x.id});
      this.store.collection("user-project").add({uid:ownerId, role:"owner", projectId:x.id});
      return x.id;
    });
  }


}
