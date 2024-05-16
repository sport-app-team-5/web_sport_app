import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import {RegisterUserService} from "../../register/registeruser.service";
import {EventService} from "../event.service";
import {HttpLoaderFactory} from "../../../app.config";
import {EventCreateComponent} from "./event-create.component";

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;
  let mockTranslateService: TranslateService;
  let mockToastrService: ToastrService;
  let mockRouter: Router;
  let mockRegisterUserService: RegisterUserService;
  let mockEventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateComponent);
    mockRegisterUserService = TestBed.inject(RegisterUserService)
    mockTranslateService = TestBed.inject(TranslateService)
    mockEventService = TestBed.inject(EventService);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

  })

  it('should create step 1', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());

    component = fixture.componentInstance
    fixture.detectChanges()

    component.setServiceType('event')
    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);
    console.log(component.currentStep)
    fixture.detectChanges()
    expect(2).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });

  it('should create step 1 invalid data', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());

    component = fixture.componentInstance
    fixture.detectChanges()

    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);
    console.log(component.currentStep)
    fixture.detectChanges()
    expect(1).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });

  it('should create step 2', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());
    component = fixture.componentInstance
    fixture.detectChanges()

    component.setServiceType('event')
    const buttonElement1 = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement1.triggerEventHandler('click', null);


    component.setSportType('event')
    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);
    console.log(component.currentStep)
    fixture.detectChanges()
    expect(3).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });



  it('should create step 2 invalid data', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());
    component = fixture.componentInstance
    fixture.detectChanges()

    component.setServiceType('event')
    const buttonElement1 = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement1.triggerEventHandler('click', null);


    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);
    console.log(component.currentStep)
    fixture.detectChanges()
    expect(2).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });

  it('should create step 2 error', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(throwError('Error'));
    component = fixture.componentInstance
    component.currentStep = 2;
    fixture.detectChanges()
    expect(2).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });



  it('should create step 3', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());
    spyOn(mockRegisterUserService, 'getCities').and.returnValue(fakeService.getCountries());

    component = fixture.componentInstance
    fixture.detectChanges()

    component.setServiceType('event')
    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);

    component.setSportType('event')
    buttonElement.triggerEventHandler('click', null);

    component.countries = [
      { id: 1, name: 'Country 1' },
      { id: 2, name: 'Country 2' }]
    component.nameEvent.setValue('event')
    component.datetimecustom.setValue('10/01/2024')
    component.country_id.setValue('2');
    const event = {
      target: {
        name: 'country_id',
        value: 2
      }
    };
    component.changeValueForm(event);
    component.city_id.setValue('2');
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges()
    expect(4).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });

  it('should create step 3 invalid', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());
    spyOn(mockRegisterUserService, 'getCities').and.returnValue(fakeService.getCountries());

    component = fixture.componentInstance
    fixture.detectChanges()

    component.setServiceType('event')
    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);

    component.setSportType('event')
    buttonElement.triggerEventHandler('click', null);

    component.countries = [
      { id: 1, name: 'Country 1' },
      { id: 2, name: 'Country 2' }]

    component.datetimecustom.setValue('10/01/2024')
    component.country_id.setValue('2');
    const event = {
      target: {
        name: 'country_id',
        value: 2
      }
    };
    component.changeValueForm(event);
    component.city_id.setValue('2');
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges()
    expect(3).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });

  it('should create step 2 and back', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());
    component = fixture.componentInstance
    fixture.detectChanges()

    component.setServiceType('event')
    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);


    component.setSportType('event')
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges()
    const buttonElement1 = fixture.debugElement.query(By.css('#buttonBack'));
    buttonElement1.triggerEventHandler('click', null);
    fixture.detectChanges()
    expect(2).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });
  it('should create step 4', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());
    spyOn(mockRegisterUserService, 'getCities').and.returnValue(fakeService.getCountries());

    component = fixture.componentInstance
    fixture.detectChanges()

    component.setServiceType('event')
    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);

    component.setSportType('event')
    buttonElement.triggerEventHandler('click', null);

    component.countries = [
      { id: 1, name: 'Country 1' },
      { id: 2, name: 'Country 2' }]
    component.nameEvent.setValue('event')
    component.datetimecustom.setValue('10/01/2024')
    component.country_id.setValue('2');
    const event = {
      target: {
        name: 'country_id',
        value: 2
      }
    };
    component.changeValueForm(event);
    component.city_id.setValue('2');
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges()

    component.place.setValue('place')
    component.quantity.setValue('1')
    component.description.setValue('description')

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges()

    expect(4).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });
  it('should create step 4 error', () => {
    spyOn(mockRegisterUserService, 'getCountries').and.returnValue(fakeService.getCountries());
    spyOn(mockRegisterUserService, 'getCities').and.returnValue(fakeService.getCountries());

    component = fixture.componentInstance
    fixture.detectChanges()

    component.setServiceType('event')
    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);

    component.setSportType('event')
    buttonElement.triggerEventHandler('click', null);

    component.countries = [
      { id: 1, name: 'Country 1' },
      { id: 2, name: 'Country 2' }]
    component.nameEvent.setValue('event')
    component.datetimecustom.setValue('10/01/2024')
    component.country_id.setValue('2');
    const event = {
      target: {
        name: 'country_id',
        value: 2
      }
    };
    component.changeValueForm(event);
    component.city_id.setValue('2');
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges()


    component.quantity.setValue('1')
    component.description.setValue('description')

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges()

    expect(component.place.value).toBe('');
    expect(4).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });


  it('should display success message and navigate to home', () => {
    const response = {};
    component = fixture.componentInstance
    component.handleUpdateResponse(response);

    expect(component).toBeTruthy();
  });

  it('should display error message', () => {
    const error = {};
    component = fixture.componentInstance
    component.handleError(error);

    expect(component).toBeTruthy();
  });

  it('should switch the language and update localStorage', () => {
    const language = 'en';
    spyOn(component.translate, 'use');
    spyOn(localStorage, 'setItem');
    component.switchLanguage(language);
    expect(component.translate.use).toHaveBeenCalledWith(language);
  });

  let fakeService = {
    getCountries(): Observable<any> {
      let temporalMuseum = [{ "id": 1, "name": "Argentina", "code": "AR" }, { "id": 2, "name": "Bolivia", "code": "BO" }, { "id": 3, "name": "Brazil", "code": "BR" }, { "id": 4, "name": "Chile", "code": "CL" }, { "id": 5, "name": "Colombia", "code": "CO" }, { "id": 6, "name": "Costa Rica", "code": "CR" }, { "id": 7, "name": "Cuba", "code": "CU" }, { "id": 8, "name": "Dominican Republic", "code": "DO" }, { "id": 9, "name": "Ecuador", "code": "EC" }, { "id": 10, "name": "El Salvador", "code": "SV" }, { "id": 11, "name": "Guatemala", "code": "GT" }, { "id": 12, "name": "Honduras", "code": "HN" }, { "id": 13, "name": "Mexico", "code": "MX" }, { "id": 14, "name": "Nicaragua", "code": "NI" }, { "id": 15, "name": "Panama", "code": "PA" }, { "id": 16, "name": "Paraguay", "code": "PY" }, { "id": 17, "name": "Peru", "code": "PE" }, { "id": 18, "name": "Puerto Rico", "code": "PR" }, { "id": 19, "name": "Uruguay", "code": "UY" }, { "id": 20, "name": "Venezuela", "code": "VE" }]
      return of(temporalMuseum);
    }
  }

});
