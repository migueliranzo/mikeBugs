import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Ticket } from 'src/app/common/models/ticket';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  ticket!:Ticket;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.ticket = JSON.parse(this.route.snapshot.paramMap.get('filter')!);

    console.log(this.ticket);
  }

}
