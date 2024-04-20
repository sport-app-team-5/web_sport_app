/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NutritionalProfileListService } from './nutritional-profile-list.service';

describe('Service: NutritionalProfileList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NutritionalProfileListService]
    });
  });

  it('should ...', inject([NutritionalProfileListService], (service: NutritionalProfileListService) => {
    expect(service).toBeTruthy();
  }));
});
