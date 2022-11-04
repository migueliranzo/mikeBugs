import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { ProjectService } from 'src/app/common/services/project.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent {

  @Output() modifiedProject:EventEmitter<any> = new EventEmitter();

  editedProject = new FormGroup({
    title: new FormControl(''),
    subtitle: new FormControl(''),
    description: new FormControl('')
  });

  saveProject(){
    this.modifiedProject.emit(this.editedProject.value);
  }

}
