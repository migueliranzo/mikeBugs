import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagmentComponent } from './project-managment.component';

describe('ProjectManagmentComponent', () => {
  let component: ProjectManagmentComponent;
  let fixture: ComponentFixture<ProjectManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
