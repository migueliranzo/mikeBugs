import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ticketListComponent } from './ticket-list.component';

describe('ticketListComponent', () => {
  let component: ticketListComponent;
  let fixture: ComponentFixture<ticketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ticketListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ticketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
