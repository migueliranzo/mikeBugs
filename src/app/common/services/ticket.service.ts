import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, where } from '@angular/fire/firestore';
import { first, from } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private store: AngularFirestore) { }

  getAllTickets(){
    return this.store.collection('tickets');
  }

  getTicket(id:number){
    return this.store.doc(`tickets/${id}`);
  }

  getProjectTickets(projectId: string){
    return this.store.collection('tickets',ref=> ref.where("project","==",projectId));
  }

  updateTicket(ticket:Ticket){
  return from(this.store.doc(`tickets/${ticket.id}`).update(ticket).then(x=>{
    return false;
  }).catch(x=>{
    return true;
  }));
  }

  createTicket(ticket: any, projectId:string, reporterMail: any){
    this.store.collection("tickets",ref => ref.where("project", "==", projectId)).get().subscribe(x=> this.store.collection("tickets").add({...ticket, tId: x.size, project: projectId, reporter: reporterMail}).then(x=>{
      this.store.collection("tickets").doc(x.id).update({id:x.id});
    }));
  }

  
}
