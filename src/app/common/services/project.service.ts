import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { forkJoin, iif, merge } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { combineLatest, map, combineAll, combineLatestAll } from 'rxjs';
import {  combineLatestWith, concatMap, every, first, flatMap, last, mergeMap, retry, scan, switchMap, tap, toArray } from 'rxjs/operators';
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
  let projects:any[] = [];

  /*
    After two sessions of trying to get this stream to work, I have gotten very close, and I have learned a lot about rxjs, sadly I have not managed 
    to emit all the values altogether the way I want, it's like I can't section the stream, I keep emitting projects without collecting and ordering them.

    I have to keep moving for now, but the rxjs pro future me will come back and make this stream a reality!

    this.store.collection("user-project", ref=> ref.where("uid", "==", id)).valueChanges().pipe(mergeMap(x=> x),mergeMap((x:any)=>  {

    return combineLatest([
      this.store.collection("projects").doc(x.projectId).valueChanges(),
      this.store.collection("user-project", ref=> ref.where("projectId","==",x.projectId)).get().pipe(map(x=> x.docs.map(x=> x.data())))
    ]).pipe(map( ([project, users] ) =>({ 
        project: project,
        users: users
    } )) )
    })
    ).subscribe(x=> console.log(x)
    )
    **/
    

    this.store.collection("user-project", ref=> ref.where("uid", "==", id).where("role", "==", 3)).get().forEach(x=> {

    for (const element of x.docs.values()) {

      this.store.collection("user-project", ref=> ref.where("projectId","==",element.get("projectId"))).valueChanges().pipe(first()).subscribe(users=> {
        console.log(users);
        
        this.store.collection("projects").doc(element.get("projectId")).valueChanges().pipe(first()).subscribe((x:any)=> x != undefined? projects.push({...x, users: users}) : null);
      } );
      }
    });

    return of(projects);
  }

  saveProject(project: any, owner: any) {
    let uid = owner.uid;
    let email = owner.email;
    
    return from(this.store.collection("projects").add(project).then(x=> {
      this.store.collection("projects").doc(x.id).update({id:x.id});
      this.store.collection("user-project").add({uid:uid, email:email, role:3, projectId:x.id});
      
    }));
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
