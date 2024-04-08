import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterUserService } from './registeruser.service';
import { API_SPORT_PLAN_BASE_URL, API_USER_BASE_URL } from '../../../../api.constants';

describe('RegisterUserService', () => {
  let service: RegisterUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterUserService]
    });

    service = TestBed.inject(RegisterUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user', () => {
    const mockData = { "User": "Test User"};
    service.createUser(mockData).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${API_USER_BASE_URL}users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });

  it('should save user info', () => {
    const mockData = {  "CONTRY": "COLOMBIA" };
    service.saveInfoSporPlanService(mockData).subscribe((data:any) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${API_SPORT_PLAN_BASE_URL}sport_men`);
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });

  it('should get countries', () => {
    const mockData = {  "Countries": "COLOMBIA" };
    service.getCountries().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${API_USER_BASE_URL}locations/countries`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get cities', () => {
    const mockData = {  "Cities": "CALI" };
    const country_id = 1;
    service.getCities(country_id).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${API_USER_BASE_URL}locations/cities/${country_id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
