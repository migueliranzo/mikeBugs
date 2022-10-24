import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/common/models/user';
import { TicketService } from 'src/app/common/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent implements OnInit {

  priorities: any[] = [{viewValue:"Low", value:0},{viewValue:"Medium", value:1},{viewValue:"High", value:2},{viewValue:"Critical", value:3}];
  statuses: any[] = [{viewValue:"Proposed", value:0},{viewValue:"Active", value:1},{viewValue:"Closed", value:2},{viewValue:"Created", value:3}];
  severities: any[] = [{viewValue:"Low", value:0},{viewValue:"Medium", value:1},{viewValue:"High", value:2},{viewValue:"Critical", value:3}];
  categories: any[] = [{viewValue:"Bug", value:0},{viewValue:"Task", value:1},{viewValue:"Requirement", value:2},{viewValue:"Test case", value:3}];
  users: User[] = [];

  editedTicket = new FormGroup({
    name: new FormControl(''),
    priority: new FormControl(),
    severity: new FormControl(),
    category: new FormControl(),
    status: new FormControl(),
    assigned: new FormControl('onhold'),
    project: new FormControl(0),
    reported: new FormControl('onhold'),
    creationDate: new FormControl(serverTimestamp()),
    lastUpdateChange: new FormControl(serverTimestamp()),
    description: new FormControl(''),
  });



  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
  }

  saveTicket(){
    console.log(this.editedTicket.value);
    this.ticketService.saveTicket(this.editedTicket.value);
    
  }



}
