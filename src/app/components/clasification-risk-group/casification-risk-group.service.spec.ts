/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CasificationRiskGroupService } from './casification-risk-group.service';

describe('Service: CasificationRiskGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasificationRiskGroupService]
    });
  });

  it('should ...', inject([CasificationRiskGroupService], (service: CasificationRiskGroupService) => {
    expect(service).toBeTruthy();
  }));
});
