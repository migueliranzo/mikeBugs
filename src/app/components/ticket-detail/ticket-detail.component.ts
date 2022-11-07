import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Ticket } from 'src/app/common/models/ticket';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/miniavs';
import { environment } from 'src/environments/environment';
import { TicketService } from 'src/app/common/services/ticket.service';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {

  ticket$?: Observable<Ticket>;
  project!: any;

  priority : any = environment.priorityIterable;
  status: any  =   environment.statusIterable;
  severity: any  = environment.severityIterable;
  category : any = environment.categoriesIterable;

  editMode: boolean = false;
  customIMG!: string;

  svg:any;

  constructor(private route: ActivatedRoute, private ticketService: TicketService) {}

  ngOnInit(): void {
    let ticketId = JSON.parse(this.route.snapshot.paramMap.get('filter')!).id;
    this.project = JSON.parse(this.route.snapshot.paramMap.get('project')!);
  
    this.ticket$ = this.ticketService.getTicket(ticketId).valueChanges().pipe(tap(x=>{
        let y = x as Ticket;
        this.setProfilePic(y.assigned);
      })) as Observable<Ticket | any> ;

  }

  saveTicketChanges(ticket:Ticket){
    this.editMode = false;
    this.ticketService.updateTicket(ticket);
  }

  setProfilePic(assigned:string){
      this.svg = createAvatar(style, {
        seed: assigned,
        dataUri: true
      });    
    }
    
}
