import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParamMap, ActivatedRoute} from '@angular/router';
import { first, map, Observable, Subscription, tap } from 'rxjs';
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
  priority: any;
  status: any;
  categories: any;
  severity: any;
  currentUser: string | null | undefined;

  readonly formControl: FormGroup;

  //Filter table bindings


  //temp
  samples: any[] = [
    {viewValue:"Option A",value:0},
    {viewValue:"Option B",value:1},
    {viewValue:"Option C",value:2},
    {viewValue:"Option D",value:3},
  ];


  dropDownfilterStructure:any = [{label:"Name", content: this.samples},{label:"Reported by", content: this.samples},{label:"Assigned to", content: this.samples},
  {label:"Status", content: this.samples},{label:"Priority", content: this.samples},{label:"Category", content: this.samples},{label:"Project", content: this.samples},
  {label:"Severity", content: this.samples}];

  displayedColumns: string[] = ["tId","name" ,"priority", "severity" ,"status", "category", "creationDate"];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService, public authService: AuthService, public projectService: ProjectService,  formBuilder: FormBuilder, public matDialog: MatDialog, public auth: Auth) {

    this.formControl = formBuilder.group({
      status: null,
      severity: null,
      name: null,
      project: null,
      priority: null,
    })
    this.formControl.valueChanges.subscribe(value => {
      console.log(value);
      
      const filter = {...value} as string;
      this.dataSource.filter = filter;
    });
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('filter') == null || (params.get('filter') ==  undefined)) {
        return;
      }
      
      this.authService.currentUser$.subscribe(x=> this.currentUser = x?.email);
      this.selectedProjectId = params.get('filter');
      this.selectedProject$ = this.projectService.getProject(this.selectedProjectId);
      this.selectedProject$.subscribe((x:any)=> console.log(x));
      
      this.setUpDataTable();
      this.getAllVariables();
    });
  }

  /*
  
      reported: null,
      assigned: null,
      priority: null,
      category: null,
      project: null,
      createdStart: null,
      createdEnd: null,
      updatedStart: null,
      updatedEnd: null,
  */

  setUpDataTable(){
    
    this.ticketService.getProjectTickets(this.selectedProjectId).valueChanges().pipe(tap(x=> {

      this.dataSource = new MatTableDataSource(x)
      
      this.dataSource.filterPredicate = ((data, filter:any) => {
        const a = filter.status == null || data.status === filter.status ;
        const b = !filter.name || data.name.toLowerCase().includes(filter.name.toLowerCase());
        const c = filter.severity == null || data.severity === filter.severity;
        const d = filter.project == null || data.project === filter.project;
        const e = filter.priority == null || data.priority === filter.priority;
        return a && b && c && d && e;
      }) as (arg0: any, arg1: string) => boolean;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    })).subscribe();
  }

  getAllVariables() {
    this.priority = environment.priority;
    this.status = environment.status;
    this.severity = environment.severity;
    this.categories = environment.categories;
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
    this.selectedProject$.subscribe((x:any)=> {
      this.router.navigate(["/ticket-detail", { filter: JSON.stringify(ticket.id), project: JSON.stringify(x)}])
    });
    
  
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
      
      this.ticketService.createTicket(ticket,this.selectedProjectId, this.currentUser);
    })
  }

}

