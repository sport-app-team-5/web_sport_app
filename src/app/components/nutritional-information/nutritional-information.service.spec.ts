import { TestBed } from '@angular/core/testing';

import { NutritionalInformationService } from './nutritional-information.service';

describe('NutritionalInformationService', () => {
  let service: NutritionalInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionalInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
