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

  getProjectTickets(projectId: string){
    return this.store.collection('tickets',ref=> ref.where("project","==",projectId));
  }

  saveTicket(ticket: any, projectId:string, reporterMail: any){
    this.store.collection("tickets",ref => ref.where("project", "==", projectId)).get().subscribe(x=> this.store.collection("tickets").add({...ticket, id: x.size, project: projectId, reporter: reporterMail}));
  }

}
