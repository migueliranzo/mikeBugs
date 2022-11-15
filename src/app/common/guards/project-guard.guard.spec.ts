import { TestBed } from '@angular/core/testing';

import { ProjectGuardGuard } from './project-guard.guard';

describe('ProjectGuardGuard', () => {
  let guard: ProjectGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProjectGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
