import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, from } from 'rxjs';
import { concat, map, switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentProject: any;
  currentTicket: any;
  
  currentUser$ = authState(this.auth);

  constructor(public auth: Auth, private store: AngularFirestore) { }

  login(email:string, password:string) {
  return from(signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      return false;
    })
    .catch((error) => {
      const errorMessage = error.message;
      return true;
    }));
  }

  createAccount(email: string, password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password).then((userCredential)=>{
      return false;
    }).catch((error)=>{
      return true;
    }));
  }

  resetMail(email:string){
    return from(sendPasswordResetEmail(this.auth,email).then((mail)=>{
      return false;
    }).catch((error)=>{
      return true;
    }));
  }

  logout() {
    this.auth.signOut();
  }

  acceptProjectInvite(invite:any){
    
    return from(this.store.collection("invitations").doc(invite.id).delete().then(x=>{
      return  this.store.collection("user-project").add({email: invite.email, projectId: invite.projectId, role: 4, uid:  this.auth.currentUser?.uid }).then(x=>{
        return false;
      }).catch(x=>{
        return true
      })
    }))

  }

  getUserInvitations(){
      return this.store.collection("invitations", (x=> x.where("email","==",this.auth.currentUser?.email))).valueChanges();
    }

    LoggedBelongsToProject(projectId: string){
      
      return authState(this.auth).pipe(switchMap((x: any)=> ( 
        x = combineLatest(this.store.collection("user-project",ref=> ref.where("email","==",x?.email).where("projectId",'==',projectId )).valueChanges())
      )))
      

    }
  
}
