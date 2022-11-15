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
import { from } from 'rxjs';
import { concat } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    
    this.store.collection("invitations").doc(invite.id).delete().then(x=>{
      this.store.collection("user-project").add({email: invite.email, projectId: invite.projectId, role: 4, uid:  this.auth.currentUser?.uid })
    })

  }

  getUserInvitations(){
      return this.store.collection("invitations", (x=> x.where("email","==",this.auth.currentUser?.email))).valueChanges();
    }
  
}
