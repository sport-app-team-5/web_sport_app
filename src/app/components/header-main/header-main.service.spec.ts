/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderMainService } from './header-main.service';

describe('Service: HeaderMain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderMainService]
    });
  });

  it('should ...', inject([HeaderMainService], (service: HeaderMainService) => {
    expect(service).toBeTruthy();
  }));
});
