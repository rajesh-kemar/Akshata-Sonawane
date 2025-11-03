import { TestBed } from '@angular/core/testing';

import { Trips } from './tripsService';

describe('Trips', () => {
  let service: Trips;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Trips);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
