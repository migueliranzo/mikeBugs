import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/common/models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() projects?: Project[];
  @Output() openProject: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getParticipants(devs: any) {
    return {
      0: `No one is currently working on this project`,
      1: `${devs[0]?.name} is working on this`,
      2: `${devs[0]?.name} and ${devs[1]?.name} work on this`,
      3: `${devs[0]?.name}, ${devs[1]?.name}, and ${devs[2]?.name} work on this`,
      4: `${devs[0]?.name}, ${devs[1]?.name} and ${devs.length - 2 } others are working on this`,
    }[Math.min(4, devs.length)]; 
  }

}
