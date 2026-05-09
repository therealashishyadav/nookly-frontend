import { TestBed } from '@angular/core/testing';

import { PgdetailsService } from './pgdetails.service';

describe('PgdetailsService', () => {
  let service: PgdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PgdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
