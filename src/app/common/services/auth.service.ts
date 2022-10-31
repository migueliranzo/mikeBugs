import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
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
    from(signInWithEmailAndPassword(this.auth, email, password)).subscribe(x=> console.log(x.user.uid)
    );
  }

  singin(email: string, password:string){
    from(createUserWithEmailAndPassword(this.auth,email,password)).subscribe(x=> console.log(x.user.uid)
    )
  }

  logout() {
    return from(this.auth.signOut());
  }


}
