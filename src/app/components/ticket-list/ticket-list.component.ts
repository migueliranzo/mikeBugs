import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParamMap, ActivatedRoute} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ticket } from 'src/app/common/models/ticket';
import { TicketService } from 'src/app/common/services/ticket.service';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/common/services/variables.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class ticketListComponent implements OnInit {

  selectedProject: string | null | undefined;
  tickets$?: Observable<Ticket[]>;
  tickets: Ticket[] = [];
  dataSource!: MatTableDataSource<Ticket>;

  //temp
  samples: any[] = [
    {viewValue:"Option A",value:"0"},
    {viewValue:"Option B",value:"1"},
    {viewValue:"Option C",value:"2"},
    {viewValue:"Option D",value:"3"},
  ];
  dropDownfilterStructure:any = [{label:"Title", content: this.samples},{label:"Reported by", content: this.samples},{label:"Assigned to", content: this.samples},
  {label:"Status", content: this.samples},{label:"Priority", content: this.samples},{label:"Category", content: this.samples},{label:"Project", content: this.samples},
  {label:"Severity", content: this.samples}];

  priority: any;
  status: any;
  severity: any;
  displayedColumns: string[] = ["id", "priority" , "title" , "project", "severity","status", "category", "lastUpdateChange"];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService, private variablesService: VariablesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('filter') == null || (params.get('filter') ==  undefined)) {
        return;
      }
      this.selectedProject = params.get('filter');
    });

    this.getAllVariables();
    this.getAllTickets();

    console.log(this.severity);
    
  }

  getAllVariables() {
    this.priority = this.variablesService.priority;
    this.status = this.variablesService.status;
    this.severity = this.variablesService.severity;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(x=> {
      this.tickets = x;
      this.dataSource = new MatTableDataSource(x);
    });
  
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }

  goDetailTicket(ticket:Ticket){
    console.log(ticket);
    
    this.router.navigate(["/ticket-detail", { filter: JSON.stringify(ticket) }])
  }

}

