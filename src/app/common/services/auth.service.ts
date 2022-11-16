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
import { serverTimestamp } from '@angular/fire/firestore';
import { combineLatest, from, of } from 'rxjs';
import { concat, first, map, switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentProject: any;
  currentTicket: any;
  
  currentUser$ = authState(this.auth);

  constructor(public auth: Auth, private store: AngularFirestore) { }

  login(email:string, password:string) {

  if(email == "demo@gmail.com"){

    this.setUpDemoUser();

    
  }
    
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
        if(invite.email != "demo@gmail.com" && invite.projectId == "uZPq2ztYGzLcCkFtoBPM"){
          this.store.doc(`projects/${invite.projectId}`).collection("history").add({update: `${invite.email} joined the project`, timeStamp: serverTimestamp()})
        }
        return false;
      }).catch(x=>{
        return true
      })
    }))

  }

  getUserInvitations(){
      return this.store.collection("invitations", (x=> x.where("email","==",this.auth.currentUser?.email))).valueChanges();
    }

    loggedBelongsToProject(projectId: string){
      
      return authState(this.auth).pipe(switchMap((x: any)=> ( 
        x = combineLatest(this.store.collection("user-project",ref=> ref.where("email","==",x?.email).where("projectId",'==',projectId )).valueChanges())
      )))
      

    }

    inviteDemoUser(projectId: any){
      let randomName = (Math.random() + 1).toString(36).substring(7) + "@gmail.com";
      this.store.collection("user-project").add({email: randomName, projectId: projectId, role: 4 }).then(x=>{
        this.store.doc(`projects/${projectId}`).collection("history").add({update: `${randomName} joined the project`, timeStamp: serverTimestamp()})
        
      })
    }

    setUpDemoUser() {

      this.store.doc("user-project/XCQ907UjKIyaI3iAVeEt").set({email:"demo@gmail.com",projectId:"8oJWaCAJ6eJix9Z7XRcv",role:3,uid:"pfbgXMbr7oWZtgZGHkrFKZC4JhJ3"})
  
      this.store.collection("user-project",ref=> ref.where("email","==","demo@gmail.com")).get().subscribe(x=>{
        x.forEach((y:any)=>{
          
          if(y.data().projectId != "8oJWaCAJ6eJix9Z7XRcv") {
          y.ref.delete();
        }})
        
      })
  
      this.store.doc(`projects/8oJWaCAJ6eJix9Z7XRcv`).set({
        description: "This project has some fake data to toy around the web site without doing any damage",
        subtitle:"A project to show the website capabilities as a project owner",
        title:"Owner demo project",
        id: "8oJWaCAJ6eJix9Z7XRcv"
      })
      this.store.collection("user-project", ref=> ref.where("projectId", "==", "8oJWaCAJ6eJix9Z7XRcv")).get().subscribe(x=>{
        x.forEach((y:any)=>{
          
          if(y.data().email != "demo@gmail.com")
          y.ref.delete();
        })
      })
  
      this.store.collection(`projects/${"8oJWaCAJ6eJix9Z7XRcv"}/history`).get().forEach(x=>{
        x.forEach(y=>{
          y.ref.delete();
        })
      })
  
      this.store.collection(`tickets`, ref=> ref.where("project","==",'8oJWaCAJ6eJix9Z7XRcv')).get().subscribe(x=>{
        x.forEach((y:any)=>{
          y.ref.delete();
        })
        
        this.store.doc("tickets/CIkyUH2kXgWlCdL6xK4K").set({
          assigned:"demo@gmail.com", category:2,creationDate:serverTimestamp(), description:"While commenting for an issue, it is showing an error saying APPLICATION ERROR #27 \n APPLICATION ERROR #27 \nYou have reached the allowed activity limit of 10 events within the last 3600 seconds; your action has been blocked to avoid spam, please try again later.Please use the 'Back' button in your web browser to return to the previous page. There you can correct whatever problems were identified in this error or select another action. You can also click an option from the menu bar to go directly to a new section.",
          id:"CIkyUH2kXgWlCdL6xK4K", name:"APPLICATION ERROR #27", priority:2, project:"8oJWaCAJ6eJix9Z7XRcv", reporter:"demo@gmail.com",severity:1,status:1,tId:3
        })
      })
      
      this.store.collection("tickets/CIkyUH2kXgWlCdL6xK4K/comments").get().forEach(x=>{
        x.forEach(y=>{
          y.ref.delete();
        })
      })
  
      this.store.collection("tickets/CIkyUH2kXgWlCdL6xK4K/history").get().forEach(x=>{
        x.forEach(y=>{
          y.ref.delete();
        })
      })
  
      this.store.doc("invitations/d4TLqxt0niaeS69r7YUZ").set({email:"demo@gmail.com",id:"d4TLqxt0niaeS69r7YUZ",projectId:"uZPq2ztYGzLcCkFtoBPM",projectName:"Dev demo invite project"});
  
      this.store.collection("user-project", ref=> ref.where("projectId", "==","uZPq2ztYGzLcCkFtoBPM").where("email","==", "demo@gmail.com")).get().subscribe(x=>{
        
        x.forEach((y:any)=>{
          y.ref.delete();
        })
      })
  
    }
  

  
}
