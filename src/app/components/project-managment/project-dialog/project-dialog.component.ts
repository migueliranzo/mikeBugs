import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Project } from 'src/app/common/models/project';
import { AuthService } from 'src/app/common/services/auth.service';
import { ProjectService } from 'src/app/common/services/project.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent {

  project?: Project;
  editMode: boolean = false;

  @Input() set inputProject(project:Project){
    if(!project) return;
    this.project = project;
    this.editMode = true;
    this.editedProject.get("title")?.setValue(this.project.title);
    this.editedProject.get("subtitle")?.setValue(this.project.subtitle);
    this.editedProject.get("description")?.setValue(this.project.description);
    this.editedProject.get("id")?.setValue(this.project.id)
  }
  @Output() modifiedProject:EventEmitter<any> = new EventEmitter();

  editedProject = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(3)]),
    subtitle: new FormControl('',[Validators.required,Validators.minLength(6)]),
    description: new FormControl('',[Validators.required,Validators.minLength(12)]),
    id: new FormControl(''),
  });

  saveProject(){
    this.modifiedProject.emit({value: this.editedProject.value, editMode: this.editMode});
  }

}
