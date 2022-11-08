import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, serverTimestamp, where } from '@angular/fire/firestore';
import { combineLatest, first, from, map, switchMap, tap } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Ticket } from '../models/ticket';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private store: AngularFirestore, private auth: AuthService) { }


  getAllTickets(){
    return this.store.collection('tickets');
  }

  getTicket(id:number){
    return  combineLatest([
    this.store.doc(`tickets/${id}`).get(), 
    this.store.collection(`tickets/${id}/history`).get(),
  ]).pipe(map(([ticket,history]) => ({ 
      ticketObj: ticket.data() as Ticket, 
      ticketHistory: history.docChanges().map(x=> x.doc.data())
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
      oldTicket.ref.collection("history").add(this.getTicketChanges(newTicket, oldTicket.data() as Ticket, user?.email as any)).then(x=>{
        oldTicket.ref.update(newTicket);
        return false;
      }).catch(x=>{
        return true;
      })
    )));

  }

  createTicket(ticket: any, projectId:string, reporterMail: any){
    
  return this.store.collection("tickets",ref => ref.where("project", "==", projectId)).get().pipe(switchMap(x=> (
      this.store.collection("tickets").add({...ticket, tId: x.size, project: projectId, reporter: reporterMail}).then(ticket=>{
        this.store.collection("tickets").doc(ticket.id).update({id:ticket.id});
        return false;
      }).catch(x=>{
        return true;
      }))
      )
    );

  }

  getTicketChanges(newTicket:Ticket, oldTicket:Ticket, user: string){
    let changes: any = {timestamp: serverTimestamp(), author: user};

    for (const property in newTicket) {
      if((newTicket[property as keyof Ticket] != oldTicket[property as keyof Ticket]) && !(property == "creationDate" || property == "lastUpdateChange")){
        changes["old"+property] = oldTicket[property as keyof Ticket];
        changes["new"+property] = newTicket[property as keyof Ticket];
      }
    }
    
    return changes;
  }
  
}
