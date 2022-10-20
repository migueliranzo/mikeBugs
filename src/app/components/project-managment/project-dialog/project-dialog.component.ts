import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/common/services/project.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  @Output() modifiedProject:EventEmitter<any> = new EventEmitter();

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
  }

  editedProject = new FormGroup({
    title: new FormControl(''),
    subtitle: new FormControl(''),
    description: new FormControl(''),
  });
  
  saveProject(){
    let newID = this.projectService.saveProject(this.editedProject.value);
    this.modifiedProject.emit({...this.editedProject.value, id: newID})
  }

}
