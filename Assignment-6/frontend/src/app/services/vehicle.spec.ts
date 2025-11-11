import { TestBed } from '@angular/core/testing';

//import { Vehicle } from './vehicle';
import { VehicleService } from './vehicleService';

describe('Vehicle', () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
