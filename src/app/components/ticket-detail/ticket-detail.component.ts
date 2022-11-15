import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Ticket } from 'src/app/common/models/ticket';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/miniavs';
import { environment } from 'src/environments/environment';
import { TicketService } from 'src/app/common/services/ticket.service';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ticketListComponent } from '../ticket-list/ticket-list.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AuthService } from 'src/app/common/services/auth.service';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {

  ticket$?: Observable<{
    ticketObj: Ticket;
    ticketHistory: any[];
    ticketComments: any[];
  }>;
  project!: any;

  priority : any = environment.priorityIterable;
  status: any  =   environment.statusIterable;
  severity: any  = environment.severityIterable;
  category : any = environment.categoriesIterable;

  comment: any;
  editMode: boolean = false;

  loaded: boolean = true;
  ticketId: any; 
  loggedUser: any;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private snackBar: MatSnackBar, private overlay: Overlay, private auth: AuthService) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.ticketId = JSON.parse(params.get('ticket')!);
      this.project = JSON.parse(params.get('project')!);

      this.ticket$ = this.getTicket(this.ticketId) as Observable<{
        ticketObj: Ticket;
        ticketHistory: any[];
        ticketComments: any[];
      }>;

      this.ticket$.pipe(tap(x=>{
        console.log(this.project);
        
        this.auth.currentProject = this.project;
        this.auth.currentTicket = x.ticketObj;
      })).subscribe()
    })
    
    this.auth.currentUser$.subscribe(x=> this.loggedUser = x )
  
  }

  saveTicketChanges(ticket:Ticket){
    this.editMode = false;

    const overlayRef  = this.openSpinner();

    this.ticketService.updateTicket(ticket).subscribe(error=>{
      
      if(error){
        this.snackBar.open("Nothing to update", "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
        overlayRef.destroy();
      }else{
        this.snackBar.open("Changes saved!", "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
        
        overlayRef.destroy();
      }
    })
  }

  saveComment(){
    this.loaded = false;
    this.ticketService.addComment(this.comment, this.ticketId).subscribe((error)=>{
      if(error){
        this.snackBar.open("There was an error saving your comment", "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
      }else{
        this.loaded = true;
        this.comment = "";
      }    
    })
  }

    getProfilePic(seed:string){
      return createAvatar(style, {
        seed: seed,
        dataUri: true
      });
    }

    formatDate(date:any){
      const today = new Date(date.seconds*1000);
      const yyyy = today.getFullYear();
      let mm: any = today.getMonth() + 1; // Months start at 0!
      let dd:any = today.getDate();
      
      let h: any = today.getHours()
      let mins: any = today.getMinutes()

      if (mins < 10) mins = '0' + mins;
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      return  (dd + '/' + mm + '/' + yyyy + " " + h + ":" + mins);
    }

    getValue(property:any){
      return property.value;
    }

    getKey(property: any){
      return property.key;
    }

    getTicket(ticketId:number){
      return this.ticketService.getTicket(ticketId);
    }

    getLoggedRole(){
      
        return this.project?.users?.find((x: any)=> (x.email == this.loggedUser?.email))?.role;
    }

    openSpinner(){
      return this.overlay.create({
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true,
      }).attach(new ComponentPortal(SpinnerComponent));
    }
    
}
