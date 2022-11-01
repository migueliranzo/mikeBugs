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
   return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  singin(email: string, password:string){
    from(createUserWithEmailAndPassword(this.auth,email,password)).subscribe(x=> console.log(x.user.uid)
    )
  }

  resetMail(email:string){
    from(sendPasswordResetEmail(this.auth,email))
  }

  logout() {
    return from(this.auth.signOut());
  }


}
