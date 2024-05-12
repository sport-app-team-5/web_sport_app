import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdittionaloffersService } from './adittionaloffers.service';

describe('AdittionalOffersService', () => {
  let service: AdittionaloffersService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdittionaloffersService]
    });
    service = TestBed.inject(AdittionaloffersService);
  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});