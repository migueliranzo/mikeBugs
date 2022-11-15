import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, serverTimestamp, where } from '@angular/fire/firestore';
import { combineLatest, concat, first, from, map, switchMap, tap } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  priority : any = environment.priorityIterable;
  status: any  =   environment.statusIterable;
  severity: any  = environment.severityIterable;
  category : any = environment.categoriesIterable;

  constructor(private store: AngularFirestore, private auth: AuthService) { }


  getAllTickets(){
    return this.store.collection('tickets');
  }

  getUserTickets(email: string){
    return this.store.collection('tickets',ref=> ref.where("assigned","==", email));
  }

  getTicket(id:number){
    return  combineLatest([
    this.store.doc(`tickets/${id}`).valueChanges(), 
    this.store.collection(`tickets/${id}/history`,ref=> ref.orderBy("timestamp","desc")).valueChanges(),
    this.store.collection(`tickets/${id}/comments`,ref=> ref.orderBy("timestamp","desc")).valueChanges()
  ]).pipe(map(([ticket,history, comments]) => ({ 
      ticketObj: ticket, 
      ticketHistory: history,
      ticketComments: comments,
  })));
  }

  getProjectTickets(projectId: string){
    return this.store.collection('tickets',ref=> ref.where("project","==",projectId));
  }

  updateTicket(newTicket:Ticket){

    return combineLatest([
      this.store.doc(`tickets/${newTicket.id}`).get(),
      this.auth.currentUser$,
    ]).pipe(switchMap( ([oldTicket,user]) =>( 
      this.areDifferent(newTicket, oldTicket.data() as Ticket) ? 
        oldTicket.ref.collection("history").add(this.getTicketChanges(newTicket, oldTicket.data() as Ticket, user?.email as any)).then(x=>{
        this.store.doc(`projects/${newTicket.project}`).collection("history").add({update: `${newTicket.name} was updated by ${user?.email}`, timeStamp: serverTimestamp()})
        oldTicket.ref.update(newTicket);
        return false;
      }).catch(x=>{
        return true;
      }) : of(true)
    )));

  }

  createTicket(ticket: any, projectId:string, reporterMail: any){
    
  return this.store.collection("tickets",ref => ref.where("project", "==", projectId)).get().pipe(switchMap(x=> (
      this.store.collection("tickets").add({...ticket, tId: x.size, project: projectId, reporter: reporterMail}).then(newTicket=>{
        this.store.collection("tickets").doc(newTicket.id).update({id:newTicket.id});
        this.store.doc(`projects/${projectId}`).collection("history").add({update: `${ticket.name} was created by ${reporterMail}`, timeStamp: serverTimestamp()})
        return false;
      }).catch(x=>{
        return true;
      }))
      )
    );

  }

  getTicketChanges(newTicket:Ticket, oldTicket:Ticket, user: string){
    let changes: any = {};
    
    for (const property in newTicket) {
      if((newTicket[property as keyof Ticket] != oldTicket[property as keyof Ticket]) && !(property == "creationDate" || property == "lastUpdateChange")){
        if(property != "name" && property != "description" && property != "assigned"){
        //@ts-ignore
        changes[property] = { oldValue: this[property][oldTicket[property as keyof Ticket]].viewValue,  newValue: this[property][newTicket[property as keyof Ticket]].viewValue};
      }else{
        changes[property] = { oldValue: oldTicket[property as keyof Ticket],  newValue: newTicket[property as keyof Ticket]};
      }
    }
  }
  
  return {...changes, timestamp: serverTimestamp(), author: user};
}

areDifferent(newTicket:Ticket, oldTicket:Ticket){

  for (const property in newTicket) {
    if((newTicket[property as keyof Ticket] != oldTicket[property as keyof Ticket]) && !(property == "creationDate" || property == "lastUpdateChange")){
      return true;
    }
  }
  return false;
}

addComment(newComment:string, inputTicket:any, projectId: string){
  console.log(inputTicket, projectId);
  
  let ticket = this.store.doc(`tickets/${inputTicket.id}`).ref;

  return this.auth.currentUser$.pipe(switchMap(x=> concat(
    ticket.collection("history").add({author:x?.email, comment:newComment, timestamp: serverTimestamp()}).then(x=>{
      x.id
      return false;
    }).catch(x=>{
      return true;
    }),
    ticket.collection("comments").add({user:x?.email, comment:newComment, timestamp: serverTimestamp()}).then(x=>{
      x.id
      return false;
    }).catch(x=>{
      return true;
    }),
    this.store.doc(`projects/${projectId}`).collection("history").add({update: `${x?.email} commented on ${inputTicket.name}`, timeStamp: serverTimestamp()}).then(x=>{
      x.id
      return false;
    }).catch(x=>{
      return true;
    })
  )));

}

}
