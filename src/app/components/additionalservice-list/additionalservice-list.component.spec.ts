import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AdditionalserviceListComponent } from "./additionalservice-list.component";
import { AdditionalServiceService } from "../additionalservice/additional-service.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpLoaderFactory } from "../../app.config";
import { of } from "rxjs";


describe('AdditionalserviceListComponent', () => {
  let component: AdditionalserviceListComponent;
  let fixture: ComponentFixture<AdditionalserviceListComponent>;
  let appointmentService: AdditionalServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    let component: AdditionalserviceListComponent
    let fixture: ComponentFixture<AdditionalserviceListComponent>
    let translateService: TranslateService
    let toastrService: ToastrService
    let appointmentService: AdditionalServiceService

    TestBed.configureTestingModule({
      providers: [
        AdditionalServiceService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ],
      imports: [
        AdditionalserviceListComponent,
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalserviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default language to "es" if localStorage is not available', () => {
    const mockLanguage = 'en';
    spyOn(localStorage, 'getItem').and.returnValue(mockLanguage);
    spyOn(component.translate, 'setDefaultLang');

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('lang');
    expect(component.translate.setDefaultLang).toHaveBeenCalledWith(mockLanguage);
    expect(component.language).toEqual(mockLanguage);
  });

  it('should set the default language to the value stored in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('en');
    component.ngOnInit();
    spyOn(component.translate, 'setDefaultLang');
    expect(component.language).toBe('en');
  });

  it('should set creatingAdditionalService to true', () => {
    component.createService();
    expect(component.creatingAdditionalService).toBe(true);
  });

  it('should set creatingAdditionalService to false', () => {
    component.closeWindow();
    expect(component.creatingAdditionalService).toBe(false);
  });

  it('should fetch additional services successfully', () => {
    const mockResponse = [{ id: 1, name: 'Service 1' }, { id: 2, name: 'Service 2' }];
    spyOn(component.additionalServiceService, 'getAdditionalService').and.returnValue(of(mockResponse));

    component.getAdditionalServices();

    expect(component.additionalServices).toEqual(mockResponse);
  });

  it('should call getAdditionalServices and set creatingAdditionalService to false', () => {
    spyOn(component, 'getAdditionalServices');
    component.ngOnInit();
    expect(component.getAdditionalServices).toHaveBeenCalled();
    expect(component.creatingAdditionalService).toBe(false);
  });

});
