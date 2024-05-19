import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferServiceComponent } from './offer-service.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main/main.service';
import { OfferServiceService } from './offer-service.service';
import { of, throwError } from 'rxjs';

describe('OfferServiceComponent', () => {
  let component: OfferServiceComponent;
  let fixture: ComponentFixture<OfferServiceComponent>;
  let mainService: MainService
  let checkService:OfferServiceService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        OfferServiceComponent,
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

    fixture = TestBed.createComponent(OfferServiceComponent);
    component = fixture.componentInstance;
    mainService = TestBed.inject(MainService);
    checkService = TestBed.inject(OfferServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change menu option', () => {
    component.changeMenuOption();
    expect(component.isActiveMenu).toBe('home');
  });

  it('should change inside home', () => {
    const event = {};
    const checkServiceSpy = spyOn(checkService, 'changeCheck');
    component.changeInsideHome(event);
    expect(component.isChecked).toBe(true);
    expect(checkServiceSpy).toHaveBeenCalledWith(component.isChecked);
  });

  it('should display success message', () => {
    spyOn(component.toastr, 'success');
    component.callCongrats();
    expect(component.toastr.success).toHaveBeenCalledWith('Gracias por confiar en nosotros, pronto sera contactado por un agente', 'Contacto', {
      timeOut: 3000
    });
  });

  it('should call toastr.success with correct parameters', () => {
    spyOn(component.toastr, 'success');
    component.callCongrats();
    expect(component.toastr.success).toHaveBeenCalled();
    expect(component.toastr.success).toHaveBeenCalledWith('Gracias por confiar en nosotros, pronto sera contactado por un agente', 'Contacto', {
      timeOut: 3000
    });
  });

  it('should set isAdditionalServiceActive to true', () => {
    component.getAdditionalServices();
    expect(component.isAdditionalServiceActive).toBe(true);
  });

  it('should call additionalService.getAdditionalServices with correct parameters', () => {
    spyOn(component.additionalService, 'getAdditionalServices').and.returnValue(of([]));
    component.getAdditionalServices();
    expect(component.additionalService.getAdditionalServices).toHaveBeenCalledWith(component.isChecked);
  });

  it('should set services to the returned value from additionalService.getAdditionalServices', () => {
    const mockServices = [{ name: 'Service 1' }, { name: 'Service 2' }];
    spyOn(component.additionalService, 'getAdditionalServices').and.returnValue(of(mockServices));
    component.getAdditionalServices();
    expect(component.services).toEqual(mockServices);
  });

  it('should display error message when additionalService.getAdditionalServices throws an error', () => {
    const mockError = new Error('Error obtaining additional services');
    spyOn(component.additionalService, 'getAdditionalServices').and.returnValue(throwError(mockError));
    spyOn(component.toastr, 'error');
    component.getAdditionalServices();
    expect(component.toastr.error).toHaveBeenCalledWith('Error obteniendo los servicios adicionales', 'Error', {
      timeOut: 3000
    });
  });

  it('should set menu active to recommendation', () => {
    spyOn(component, 'setMenuActive');
    spyOn(mainService, 'setMenuActive');
    component.getRecommendations();
    expect(component.setMenuActive).toHaveBeenCalledWith('recommendation');
    expect(mainService.setMenuActive).toHaveBeenCalledWith('recommendation');
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

  it('should set isSuggestedTrainingActive to true', () => {
    component.getSuggestedTrainings();
    expect(component.isSuggestedTrainingActive).toBe(true);
  });

  it('should return "Si" if value is true', () => {
    const value = true;
    const result = component.getValueOfInsideHouse(value);
    expect(result).toBe('Si');
  });

  it('should return "No" if value is false', () => {
    const value = false;
    const result = component.getValueOfInsideHouse(value);
    expect(result).toBe('No');
  });

});
