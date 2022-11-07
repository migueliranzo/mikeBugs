import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Ticket } from 'src/app/common/models/ticket';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/miniavs';
import { environment } from 'src/environments/environment';
import { TicketService } from 'src/app/common/services/ticket.service';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;
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
    this.ticket = JSON.parse(this.route.snapshot.paramMap.get('filter')!);
    this.project = JSON.parse(this.route.snapshot.paramMap.get('project')!);


    console.log(this.ticket);
    console.log(this.project);
    
    this.setProfilePic();

  

  }

  saveTicketChanges(){
    this.ticketService.updateTicket(this.ticket);
  }

  setProfilePic(){
      this.svg = createAvatar(style, {
        seed: this.ticket.assigned,
        dataUri: true
      });    
    }
    
}
