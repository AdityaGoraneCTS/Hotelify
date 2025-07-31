import { TestBed } from '@angular/core/testing';

import { HotelSearchDescService } from './hotel-search-desc-service';

describe('HotelSearchDescService', () => {
  let service: HotelSearchDescService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelSearchDescService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
