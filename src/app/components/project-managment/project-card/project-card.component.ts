import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() currentUser: any;
  @Input() projects:  any;
  @Output() openProject: EventEmitter<any> = new EventEmitter();
  @Output() editedProject: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getParticipants(devs: any) {
    if(devs == undefined) return;
    return {
      0: `No one is currently working on this project`,
      1: `${devs[0]?.email} is working on this`,
      2: `${devs[0]?.email} and ${devs[1]?.email} work on this`,
      3: `${devs[0]?.email}, ${devs[1]?.email}, and ${devs[2]?.email} work on this`,
      4: `${devs[0]?.email}, ${devs[1]?.email} and ${devs.length - 2 } others are working on this`,
    }[Math.min(4, devs.length)]; 
  }

  editProject(x:any){
    this.editedProject.emit(x)
  }
  
  checkRole(users: any[]){
    return users.find(x=> (x.email == this.currentUser.email) && (x.role == 3) );
  }

  getCompletionProgress(tickets:[]):number{
    if(tickets == undefined) return 0;
    return (tickets.filter((x:any)=> x.completed).length / tickets.length) * 100
  }


}
