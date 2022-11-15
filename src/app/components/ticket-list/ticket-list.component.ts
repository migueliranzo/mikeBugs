import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParamMap, ActivatedRoute} from '@angular/router';
import { first, map, Observable, of, Subscription, tap } from 'rxjs';
import { Ticket } from 'src/app/common/models/ticket';
import { TicketService } from 'src/app/common/services/ticket.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Auth } from '@angular/fire/auth';
import { ProjectService } from 'src/app/common/services/project.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { Overlay } from '@angular/cdk/overlay';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class ticketListComponent implements OnInit {

  selectedProjectId: any;
  selectedProject$: any;
  tickets$?: Observable<any[]>;
  dataSource!: MatTableDataSource<any>;
  priorities: any = environment.priorityIterable;
  statuses: any = environment.statusIterable;
  categories: any = environment.categoriesIterable;
  severities: any = environment.severityIterable;
  reporters: any;
  users: any;
  currentUser: string | null | undefined;

  readonly formControl: FormGroup;

  //Filter table bindings
  displayedColumns: string[] = ["tId","name" ,"priority", "severity" ,"status", "category", "creationDate"];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService,
    public authService: AuthService, public projectService: ProjectService,  formBuilder: FormBuilder,
    public matDialog: MatDialog, public auth: Auth, private overlay: Overlay, private snackBar: MatSnackBar) {

    this.formControl = formBuilder.group({
      status: null,
      severity: null,
      name: null,
      project: null,
      priority: null,
      category: null,
      assigned: null,
      reporter: null,
      startDate: null,
      endDate: null
    })
    this.formControl.valueChanges.subscribe(value => {
      console.log(value);
      
      const filter = {...value} as string;
      this.dataSource.filter = filter;
    });
  }

  ngOnInit(): void {
    this.selectedProject$ = null;
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('filter') == null || (params.get('filter') ==  undefined)) {
        
        this.authService.currentUser$.subscribe((x:any)=> 
        this.setUpDataTable( this.ticketService.getUserTickets(x.email).valueChanges())
        );
      }
      
      this.authService.currentUser$.subscribe(x=> this.currentUser = x?.email);
      this.selectedProjectId = params.get('filter');
      this.selectedProject$ = this.projectService.getProject(this.selectedProjectId);
      this.selectedProject$.subscribe((x:any)=> this.users = x.users);
      
      this.setUpDataTable(this.ticketService.getProjectTickets(this.selectedProjectId).valueChanges());
    });
  }



  setUpDataTable(query$: Observable<any>){
    
    query$.pipe(tap(x=> {
      
      this.dataSource = new MatTableDataSource(x)
      
      this.dataSource.filterPredicate = ((data, filter:any) => {
        const a = filter.status == null || data.status === filter.status ;
        const b = !filter.name || data.name.toLowerCase().includes(filter.name.toLowerCase());
        const c = filter.severity == null || data.severity === filter.severity;
        const d = filter.project == null || data.project === filter.project;
        const e = filter.priority == null || data.priority === filter.priority;
        const f = filter.category == null || data.category === filter.category;
        const g = filter.reporter == null || data.reporter === filter.reporter;
        const h = filter.assigned == null || data.assigned === filter.assigned; 
        const j = !(filter.startDate != null  && filter.endDate != null) || this.dateIsOnRange(new Date(data.creationDate.seconds * 1000), filter.endDate, filter.startDate);
        return a && b && c && d && e && f && g && h && j;
      }) as (arg0: any, arg1: string) => boolean;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    })).subscribe();
  }


  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilters(val:any){
    console.log(val);
  }

  goDetailTicket(ticket:Ticket){

    if(!this.selectedProject$){

      this.projectService.getProject(ticket.project).subscribe(x=>{
        this.router.navigate(["/ticket-detail", { filter: JSON.stringify(ticket.id), project: JSON.stringify(x)}])
      })
    }else{
      this.selectedProject$.subscribe((x:any)=> {
        this.router.navigate(["/ticket-detail", { filter: JSON.stringify(ticket.id), project: JSON.stringify(x)}])
      });
    }

  }

  dateIsOnRange(check: Date, to:Date, from:Date){
    
    if((check.getTime() <= to.getTime() && check.getTime() >= from.getTime())){
      return true;
    }else{
      return false;
    }
  }

  formatDate(date:any){
    const today = new Date(date.seconds*1000);
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd:any = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return  (dd + '/' + mm + '/' + yyyy);
  }

  openDialog(){
    let dialogInstance = this.matDialog.open(TicketDialogComponent); 
    dialogInstance.componentInstance.project$ = this.selectedProject$;
    dialogInstance.componentInstance.ticketToAdd.subscribe(ticket=>{
      
    let overlayRef  = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    }).attach(new ComponentPortal(SpinnerComponent));

      this.ticketService.createTicket(ticket,this.selectedProjectId, this.currentUser).subscribe(error=>{
        if(error){
          this.snackBar.open("Error, try again later", "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
          
        }else{
          this.snackBar.open("Ticket created successfully!", "OK",{verticalPosition:'bottom',horizontalPosition:'left', duration: 1200});
        
        }
        overlayRef.destroy();
      });
    })
  }

  getUserRole(){

    if(this.users){ 
      return this.users.find((x: any)=> (x.email == this.currentUser)).role;
    }
  }


}

