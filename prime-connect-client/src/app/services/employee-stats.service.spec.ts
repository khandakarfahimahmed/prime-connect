import { TestBed } from '@angular/core/testing';

import { EmployeeStatsService } from './employee-stats.service';

describe('EmployeeStatsService', () => {
  let service: EmployeeStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
