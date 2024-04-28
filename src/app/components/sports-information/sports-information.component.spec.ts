import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsInformationComponent } from './sports-information.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpLoaderFactory } from '../../app.config';
import { SportsInformationService } from './sports-information.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SportsInformationComponent', () => {
  let component: SportsInformationComponent;
  let fixture: ComponentFixture<SportsInformationComponent>;
  let router: Router;
  let service: SportsInformationService
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SportsInformationComponent,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [SportsInformationService],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SportsInformationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SportsInformationService)
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the item id to the injuries array', () => {
    const item = { id: 1 };
    component.onItemSelect(item);
    expect(component.injuries).toContain(item.id);
  });

  it('should set validateInjuries to false', () => {
    const item = { id: 1 };
    component.onItemSelect(item);
    expect(component.validateInjuries).toBeFalse();
  });

  it('should remove the item id from the injuries array', () => {
    const item = { id: 1 };
    component.injuries = [1, 2, 3];
    component.onItemDeSelect(item);
    expect(component.injuries).not.toContain(item.id);
  });

  it('should not remove any item from the injuries array if the item id does not exist', () => {
    const item = { id: 4 };
    component.injuries = [1, 2, 3];
    component.onItemDeSelect(item);
    expect(component.injuries).toEqual([1, 2, 3]);
  });

  it('should navigate to login page', () => {
    spyOn(component['router'], 'navigate');
    component.goToLogin();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set the dedication time and deactivate error message', () => {
    const value = '5 hours';
    component.setDedicationTime(value);
    expect(component.time_dedication_sport).toEqual(value);
    expect(component.activateErrorMessageForTimeDedications).toBeFalse();
  });

  it('should set the experience and deactivate error message', () => {
    const value = 'Si';
    component.setExperience(value);
    expect(component.exercise_experience).toEqual(value);
    expect(component.activateErrorMessageForExperience).toBeFalse();
  });

  it('should set the sport preference', () => {
    const value = 'Ciclismo';
    component.setSportPreference(value);
    expect(component.sport_preference).toEqual(value);
  });

  it('should return the correct class names when sport preference matches', () => {
    const value = 'Ciclismo';
    component.sport_preference = value;
    const result = component.getClassSportPreference(value);
    expect(result).toEqual({
      'question-button': true,
      'active-button': true,
    });
  });

  it('should return the correct class names when sport preference does not match', () => {
    const value = 'Fútbol';
    component.sport_preference = 'Ciclismo';
    const result = component.getClassSportPreference(value);
    expect(result).toEqual({
      'question-button': true,
      'active-button': false,
    });
  });

  it('should return the correct class names when exercise experience matches', () => {
    const value = 'Si';
    component.exercise_experience = value;
    const result = component.getClassExperience(value);
    expect(result).toEqual({
      'question-button': true,
      'active-button': true,
    });
  });

  it('should return the correct class names when exercise experience does not match', () => {
    const value = 'No';
    component.exercise_experience = 'Si';
    const result = component.getClassExperience(value);
    expect(result).toEqual({
      'question-button': true,
      'active-button': false,
    });
  });

  it('should update the form data when a value is changed', () => {
    const event = {
      target: {
        name: 'testName',
        value: 'testValue',
      },
    };

    component.changeValueForm(event);

    expect(component.formData['testName']).toEqual('testValue');
  });

  it('should decrement the currentStep when backStep is called', () => {
    component.currentStep = 2;
    component.backStep();
    expect(component.currentStep).toBe(1);
  });

  it('should not decrement the currentStep when backStep is called and currentStep is 1', () => {
    component.currentStep = 1;
    component.backStep();
    expect(component.currentStep).toBe(1);
  });

  it('should increment the currentStep when nextStep is called and currentStep is 1 and validateStep1 returns true', () => {
    component.currentStep = 1;
    spyOn(component, 'validateStep1').and.returnValue(true);
    component.nextStep();
    expect(component.currentStep).toBe(2);
  });

  it('should increment the currentStep when nextStep is called and currentStep is 2 and validateStep2 returns true', () => {
    component.currentStep = 2;
    spyOn(component, 'validateStep2').and.returnValue(true);
    component.nextStep();
    expect(component.currentStep).toBe(3);
  });

  it('should increment the currentStep when nextStep is called and currentStep is 3 and validateStep3 returns true', () => {
    component.currentStep = 3;
    spyOn(component, 'validateStep3').and.returnValue(true);
    component.nextStep();
    expect(component.currentStep).toBe(4);
  });

  it('should mark birth_year as touched when nextStep is called and currentStep is 3 and validateStep3 returns false', () => {
    component.currentStep = 3;
    spyOn(component, 'validateStep3').and.returnValue(false);
    spyOn(component.birth_year, 'markAsTouched');
    component.nextStep();
    expect(component.birth_year.markAsTouched).toHaveBeenCalled();
  });

  it('should increment the currentStep when nextStep is called and currentStep is 4 and validateStep4 returns true', () => {
    component.currentStep = 4;
    spyOn(component, 'validateStep4').and.returnValue(true);
    component.nextStep();
    expect(component.currentStep).toBe(5);
  });

  it('should mark weight as touched when nextStep is called and currentStep is 4 and validateStep4 returns false', () => {
    component.currentStep = 4;
    spyOn(component, 'validateStep4').and.returnValue(false);
    spyOn(component.weight, 'markAsTouched');

    component.nextStep();

    expect(component.weight.markAsTouched).toHaveBeenCalled();
  });

  it('should increment the currentStep when nextStep is called and currentStep is 5 and validateStep5 returns true', () => {
    component.currentStep = 5;
    spyOn(component, 'validateStep5').and.returnValue(true);
    component.nextStep();
    expect(component.currentStep).toBe(6);
  });

  it('should increment the currentStep when nextStep is called and currentStep is 6 and validateStep6 returns true', () => {
    component.currentStep = 6;
    spyOn(component, 'validateStep6').and.returnValue(true);
    component.nextStep();
    expect(component.currentStep).toBe(7);
  });

  it('should mark height as touched when nextStep is called and currentStep is 6 and validateStep6 returns false', () => {
    component.currentStep = 6;
    spyOn(component, 'validateStep6').and.returnValue(false);
    spyOn(component.height, 'markAsTouched');
    component.nextStep();
    expect(component.height.markAsTouched).toHaveBeenCalled();
  });

  it('should call saveData when nextStep is called and currentStep is not 1-6 and validateStep7 returns true', () => {
    component.currentStep = 7;
    spyOn(component, 'validateStep7').and.returnValue(true);
    spyOn(component, 'saveData');
    component.nextStep();
    expect(component.saveData).toHaveBeenCalled();
  });

  it('should mark height as touched when nextStep is called and currentStep is not 1-6 and validateStep7 returns false', () => {
    component.currentStep = 7;
    spyOn(component, 'validateStep7').and.returnValue(false);
    spyOn(component.height, 'markAsTouched');

    component.nextStep();

    expect(component.height.markAsTouched).toHaveBeenCalled();
  });

  it('should return true if time_dedication_sport is truthy', () => {
    component.time_dedication_sport = '5 hours';
    const result = component.validateStep1();
    expect(result).toBeTrue();
  });

  it('should set activateErrorMessageForTimeDedications to true if time_dedication_sport is falsy', () => {
    component.time_dedication_sport = '';
    component.validateStep1();
    expect(component.activateErrorMessageForTimeDedications).toBeTrue();
  });

  it('should return true if exercise_experience is truthy', () => {
    component.exercise_experience = 'Si';
    const result = component.validateStep2();
    expect(result).toBeTrue();
  });

  it('should set activateErrorMessageForExperience to true if exercise_experience is falsy', () => {
    component.exercise_experience = '';
    component.validateStep2();
    expect(component.activateErrorMessageForExperience).toBeTrue();
  });

  it('should return true if birth_year value is truthy and birth_year errors is null', () => {
    component.birth_year.setValue('1990');
    component.birth_year.setErrors(null);
    const result = component.validateStep3();
    expect(result).toBeTrue();
  });

  it('should return false if birth_year value is falsy', () => {
    component.birth_year.setValue(null);
    const result = component.validateStep3();
    expect(result).toBeFalse();
  });

  it('should return false if birth_year errors is not null', () => {
    component.birth_year.setValue('1990');
    component.birth_year.setErrors({ required: true });
    const result = component.validateStep3();
    expect(result).toBeFalse();
  });
  it('should return true if weight value is truthy and weight errors is null', () => {
    component.weight.setValue('150');
    component.weight.setErrors(null);
    const result = component.validateStep4();
    expect(result).toBeTrue();
  });

  it('should return false if weight value is falsy', () => {
    component.weight.setValue('');
    const result = component.validateStep4();
    expect(result).toBeFalse();
  });

  it('should return false if weight errors is not null', () => {
    component.weight.setValue('150');
    component.weight.setErrors({ required: true });
    const result = component.validateStep4();
    expect(result).toBeFalse();
  });

  it('should return true if height value is truthy and there are no errors', () => {
    component.height.setValue('180');
    component.height.setErrors(null);
    const result = component.validateStep5();
    expect(result).toBeTrue();
  });
  
  it('should return false if height value is falsy', () => {
    component.height.setValue('');
    const result = component.validateStep5();
    expect(result).toBeFalse();
  });
  
  it('should return false if height has errors', () => {
    component.height.setValue('180');
    component.height.setErrors({ required: true });
    const result = component.validateStep5();
    expect(result).toBeFalse();
  });
  it('should return true if sport_preference is truthy', () => {
    component.sport_preference = 'Ciclismo';
    const result = component.validateStep6();
    expect(result).toBeTrue();
  });
  
  it('should set activateErrorMessageForSportPreference to true if sport_preference is falsy', () => {
    component.sport_preference = '';
    component.validateStep6();
    expect(component.activateErrorMessageForSportPreference).toBeTrue();
  });
  it('should return true if injuries array is not empty', () => {
    component.injuries = [1, 2, 3];
    const result = component.validateStep7();
    expect(result).toBeTrue();
  });
  
  it('should set validateInjuries to true and return false if injuries array is empty', () => {
    component.injuries = [];
    const result = component.validateStep7();
    expect(component.validateInjuries).toBeTrue();
    expect(result).toBeFalse();
  });

  it('should save data successfully', () => {   
    const user_id = '123';
    const mockData = {
      birth_year: '1990',
      height: '180',
      weight: '75',
      id: user_id,
      injuries: [1, 2, 3],
      sport_preference: 'Ciclismo',
      exercise_experience: 'Si',
      time_dedication_sport: '5 hours',
    };
    spyOn(sessionStorage, 'getItem').and.returnValue(user_id); 
    spyOn(service, 'createSportProfile').and.returnValue(of({}));
    component.saveData(); 
    expect(sessionStorage.getItem).toHaveBeenCalledWith('user_id');
  });
  

});
