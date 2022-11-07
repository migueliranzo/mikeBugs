import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Project } from 'src/app/common/models/project';
import { User } from 'src/app/common/models/user';
import { TicketService } from 'src/app/common/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent implements OnInit {

  priorities: any[] = environment.priorityIterable;
  statuses: any[] = environment.statusIterable;
  severities: any[] = environment.severityIterable;
  categories: any[] = environment.categoriesIterable;
  project$!:  Observable<Project>;;

  editedTicket = new FormGroup({
    name: new FormControl(''),
    priority: new FormControl(),
    severity: new FormControl(),
    category: new FormControl(),
    status: new FormControl(0),
    assigned: new FormControl('unassigned'),
    creationDate: new FormControl(serverTimestamp()),
    lastUpdateChange: new FormControl(serverTimestamp()),
    description: new FormControl(''),
  });

  @Output() ticketToAdd: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    
  }

  saveTicket(){
    this.ticketToAdd.emit(this.editedTicket.value);
  }



}
