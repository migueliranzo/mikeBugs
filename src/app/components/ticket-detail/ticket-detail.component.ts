import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Ticket } from 'src/app/common/models/ticket';
import { VariablesService } from 'src/app/common/services/variables.service';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/miniavs';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;

  priority: any;
  status: any;
  severity: any;
  customIMG!: string;

  svg:any;

  constructor(private route: ActivatedRoute, private variablesService: VariablesService) {}

  ngOnInit(): void {
    this.ticket = JSON.parse(this.route.snapshot.paramMap.get('filter')!);

    this.getAllVariables();

    console.log(this.ticket);

    this.svg = createAvatar(style, {
      seed: this.ticket.assigned,
      dataUri: true
    });

    console.log(this.svg);
    

  }

  getAllVariables() {
    this.priority = this.variablesService.priority;
    this.status = this.variablesService.status;
    this.severity = this.variablesService.severity;
  }


}
