import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
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

  saveTicket(ticket: any){
    this.store.collection("tickets",ref => ref.where("project", "==", 0)).get().subscribe(x=> this.store.collection("tickets").add({...ticket, id: x.size}));
  }

}
