import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Ticket } from 'src/app/common/models/ticket';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/miniavs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;
  project!: any;

  priority: any;
  status: any;
  severity: any;
  category: any;
  customIMG!: string;

  svg:any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ticket = JSON.parse(this.route.snapshot.paramMap.get('filter')!);
    this.project = JSON.parse(this.route.snapshot.paramMap.get('project')!);
    this.getAllVariables();

    console.log(this.ticket);
    console.log(this.project);
    

    this.svg = createAvatar(style, {
      seed: this.ticket.assigned,
      dataUri: true
    });

    console.log(this.svg);
    

  }

  getAllVariables() {
    this.priority = environment.priority;
    this.status = environment.status;
    this.severity = environment.severity;
    this.category = environment.categories;
  }


}
