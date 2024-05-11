import { TestBed } from '@angular/core/testing';

import { DemographyProfileService } from './demography-profile.service';

describe('DemographyProfileService', () => {
  let service: DemographyProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemographyProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
