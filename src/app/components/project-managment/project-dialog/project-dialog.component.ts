import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { ProjectService } from 'src/app/common/services/project.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  @Output() modifiedProject:EventEmitter<any> = new EventEmitter();
  @Input() currentUserId:any;

  editedProject = new FormGroup({
    title: new FormControl(''),
    subtitle: new FormControl(''),
    description: new FormControl(''),
    ownerId : new FormControl()
  });

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.editedProject.controls["ownerId"].setValue(this.currentUserId);
  }
  
  saveProject(){
    let newID = this.projectService.saveProject(this.editedProject.value, this.currentUserId);
    this.modifiedProject.emit({...this.editedProject.value, id: newID})
  }

}
