import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(public auth: Auth) { }

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
    return from(this.auth.signOut());
  }


}
