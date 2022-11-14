import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { forkJoin, iif, merge, Observable } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { combineLatest, map, combineAll, combineLatestAll, switchMap } from 'rxjs';
import {  combineLatestWith, concatAll, concatMap, every, first, flatMap, last, mergeAll, mergeMap, retry, scan, tap, toArray } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(private store: AngularFirestore) {}

  getAllProjects(){
    return this.store.collection("projects");
  }

  getProject(projectId:string){ 
  return this.store.collection("projects").doc(projectId).valueChanges().pipe(switchMap((x:any)=> (
      this.store.collection("user-project", ref=> ref.where("projectId","==",x.id))).valueChanges().pipe(map(users=> users = {...x, users: users}))
    ));
  }

  getUserProjects(id:string){

  return this.store.collection("user-project", ref=> ref.where("uid", "==", id).where("role", "==", 3)).valueChanges().pipe(switchMap((x:any)=> {

      if(x.length != 0){
        return this.store.collection("user-project", ref=> ref.where("uid", "==", id).where("role", "==", 3)).valueChanges().pipe(
          map((x:any)=> x = x.map((x:any)=> combineLatest([ 
            this.store.collection("projects",ref=> ref.where("id","==",x.projectId)).valueChanges(),
            this.store.collection("user-project",ref=> ref.where("projectId","==",x.projectId)).valueChanges()]))),
            switchMap((x:Observable<any>[]) => combineLatest(x)),
            map(x=> x.map( (x:any)=> ({...x[0][0], users: x[1]}) ))
          
          )
      }else{
        return of("0proyects")
      }
  }))
    
  }

  saveProject(project: any, owner: any, editMode: boolean) {
    
    let uid = owner.uid;
    let email = owner.email;
    if(editMode){

      return from(this.store.doc("projects/" + project.id).update(project).then(x=>{
        return {error: false, code: "Project updated!"};
      }).catch(x=> {
        return {error: true, code: "There was a problem updating the project"};
      }));

    }else{
    
    return from(this.store.collection("projects").add(project).then(x=> {
      this.store.collection("projects").doc(x.id).update({id:x.id});
      this.store.collection("user-project").add({uid:uid, email:email, role:3, projectId:x.id});
      return {error: false, code: "Project created!"};
    }).catch(x=>{
      return {error: true, code: "There was a problem creating the project"};
    }));

  }
  }

  sendInvitation(invitation:any){

    return this.store.collection("invitations",x=> x.where("email","==",invitation.email).where("projectId", "==", invitation.projectId)).valueChanges().pipe(first(), switchMap((x:any)=>(
        iif(
          () => x.length == 0,
          from(
            this.store.collection("invitations").add(invitation).then(x=>{
              this.store.collection("invitations").doc(x.id).update({id:x.id});
              return {error: false, code: "Invitation sent!"};
            }).catch(x=> {
              return {error: true, code: x};
            })),
          of({error: true, code: "User is already invited"}))
    )))

  }

  updateUsers(updateObject:any){
    let projectId = updateObject.projectId;
    for (const user in updateObject.updates) {
      this.store.collection("user-project", x=> x.where("projectId", "==", projectId).where("email","==",user)).get().forEach(x=>{
        if(updateObject.updates[user].hasOwnProperty("cheked") && updateObject.updates[user].cheked){
          x.docs[0].ref.delete();
        }else{
          x.docs[0].ref.update({role:updateObject.updates[user].role})
        }
      })
  }

}
}
