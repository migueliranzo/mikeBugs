import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ticket } from 'src/app/common/models/ticket';
import { TicketService } from 'src/app/common/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class ticketListComponent implements OnInit {

  selectedProject: string | null | undefined;
  tickets$?: Observable<Ticket[]>;
  tickets: Ticket[] = [];
  displayedColumns: string[] = ["id", "priority" , "title" , "severity","status", "category", "lastUpdateChange"];

  priority: any = { 0:"Low", 1:"Medium", 2:"High", 3: "Critical"};
  status: any = { 0:"Proposed", 1:"Active", 2:"Closed"};
  severity: any = {0:"expand_more", 1:"minimize", 2:" expand_less", 3: "error"};

  samples: any[] = [
    {viewValue:"Option A",value:"0"},
    {viewValue:"Option B",value:"1"},
    {viewValue:"Option C",value:"2"},
    {viewValue:"Option D",value:"3"},
  ]

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('filter') == null || (params.get('filter') ==  undefined)) {
        return;
      }
      this.selectedProject = params.get('filter');
    });

    this.getAllTickets();

      
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(x=> this.tickets = x);
    
  }
  
}

