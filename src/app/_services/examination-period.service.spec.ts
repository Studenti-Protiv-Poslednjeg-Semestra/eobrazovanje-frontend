import { TestBed } from '@angular/core/testing';

import { ExaminationPeriodService } from './examination-period.service';

describe('ExaminationPeriodService', () => {
  let service: ExaminationPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminationPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
