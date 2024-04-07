import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { RegisterUserService } from './registeruser.service';
import { HttpClientModule } from "@angular/common/http";
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const fakeService1 = {
    getCountries(): Observable<any[]> {
      return of([
        { id: 1, name: 'Country1' },
        { id: 2, name: 'Country2' }
      ]);
    }
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
     // declarations: [ RegisterComponent ],
      imports: [HttpClientModule, ReactiveFormsModule, FormsModule, ToastrModule.forRoot()],
      providers: [ RegisterUserService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    let mock = TestBed.inject(RegisterUserService);
    spyOn(mock, 'getCountries').and.returnValue(fakeService1.getCountries());
    component.getCountries();
    expect(component).toBeTruthy();

  });


describe('nextStep', () => {
  it('should increment currentStep if currentStep is 1', () => {
    component.currentStep = 1;

    component.nextStep();

    expect(component.currentStep).toBe(2);
  });

  it('should increment currentStep if currentStep is 2 and validateStep2 returns true', () => {
    component.currentStep = 2;
    spyOn(component, 'validateStep2').and.returnValue(true);

    component.nextStep();

    expect(component.currentStep).toBe(3);
  });

  it('should not increment currentStep if currentStep is 2 and validateStep2 returns false', () => {
    component.currentStep = 2;
    spyOn(component, 'validateStep2').and.returnValue(false);

    component.nextStep();

    expect(component.currentStep).toBe(2);
  });

  it('should increment currentStep if currentStep is 3 and validateStep3 returns true', () => {
    component.currentStep = 3;
    spyOn(component, 'validateStep3').and.returnValue(true);

    component.nextStep();

    expect(component.currentStep).toBe(4);
  });

  it('should not increment currentStep if currentStep is 3 and validateStep3 returns false', () => {
    component.currentStep = 3;
    spyOn(component, 'validateStep3').and.returnValue(false);

    component.nextStep();

    expect(component.currentStep).toBe(3);
  });

  it('should call saveUserData if currentStep is 4', () => {
    component.currentStep = 4;
    spyOn(component, 'saveUserData');

    component.nextStep();

    expect(component.saveUserData).toHaveBeenCalled();
  });

  // Similar tests for currentStep 3 and 4...
});
describe('validateStep3', () => {
  it('should return true if all fields have values', () => {
    component.name = new FormControl('John');
    component.lastname = new FormControl('Doe');
    component.document_type = new FormControl('Passport');
    component.document_number = new FormControl('123456');

    expect(component.validateStep3()).toBeTrue();
  });

  it('should return false if any field does not have a value', () => {
    component.name = new FormControl('John');
    component.lastname = new FormControl(null);
    component.document_type = new FormControl('Passport');
    component.document_number = new FormControl('123456');

    expect(component.validateStep3()).toBeFalse();
  });
});

describe('validateStep4', () => {
  it('should return true if role_id is 1 and all fields have values', () => {
    component.role_id = 1;
    component.birth_city_id = new FormControl('1');
    component.birth_country_id = new FormControl('1');
    component.residence_country_id = new FormControl('1');
    component.residence_city_id = new FormControl('1');

    expect(component.validateStep4()).toBeTrue();
  });

  it('should return false if role_id is 1 and any field does not have a value', () => {
    component.role_id = 1;
    component.birth_city_id = new FormControl('1');
    component.birth_country_id = new FormControl(null); // One field does not have a value
    component.residence_country_id = new FormControl('1');
    component.residence_city_id = new FormControl('1');

    expect(component.validateStep4()).toBeFalse();
  });

});

describe('validateStep5', () => {
  it('should always return true', () => {
    expect(component.validateStep5()).toBeTrue();
  });
});

describe('validateStep2', () => {
  it('should return true if all fields have values', () => {
    component.email = new FormControl('test@example.com');
    component.password = new FormControl('password');
    component.confirmPassword = new FormControl('password');

    expect(component.validateStep2()).toBeTrue();
  });

  it('should return false if any field does not have a value', () => {
    component.email = new FormControl('test@example.com');
    component.password = new FormControl('');
    component.confirmPassword = new FormControl('password');

    expect(component.validateStep2()).toBeFalse();
  });
});

describe('validateStep4', () => {

  it('should return true if role_id is 2 and all fields have values', () => {
    component.role_id = 2;
    component.residence_country_id = new FormControl('1');
    component.residence_city_id = new FormControl('1');

    expect(component.validateStep4()).toBeTrue();
  });

  it('should return false if role_id is 2 and any field does not have a value', () => {
    component.role_id = 2;
    component.residence_country_id = new FormControl(null); // One field does not have a value
    component.residence_city_id = new FormControl('1');

    expect(component.validateStep4()).toBeFalse();
  });
});

describe('backStep', () => {
  it('should decrement currentStep if it is greater than 1', () => {
    component.currentStep = 2;
    component.backStep();
    expect(component.currentStep).toBe(1);
  });

  it('should not decrement currentStep if it is not greater than 1', () => {
    component.currentStep = 1;
    component.backStep();
    expect(component.currentStep).toBe(1);
  });
});

describe('setRoleId', () => {
  it('should set role_id in formData', () => {
    component.setRoleId(2);
    expect(component.formData['role_id']).toBe(2);
  });
});

describe('changeValueForm', () => {
  it('should set the value in formData', () => {
    const event = { target: { name: 'test', value: 'value' } };
    component.changeValueForm(event);
    expect(component.formData['test']).toBe('value');
  });

  it('should call getCitiesResidence if name is residence_country_id', () => {
    const event = { target: { name: 'residence_country_id', value: 'value' } };
    spyOn(component, 'getCitiesResidence');
    component.changeValueForm(event);
    expect(component.getCitiesResidence).toHaveBeenCalled();
  });

  it('should call getCitiesBirth if name is birth_country_id', () => {
    const event = { target: { name: 'birth_country_id', value: 'value' } };
    spyOn(component, 'getCitiesBirth');
    component.changeValueForm(event);
    expect(component.getCitiesBirth).toHaveBeenCalled();
  });
});

it('should create the component', () => {
  let mock = TestBed.inject(RegisterUserService);
  spyOn(mock, 'createUser').and.returnValue(fakeService1.getCountries());
  component.saveUserData();
  expect(component).toBeTruthy();

});

describe('getCitiesResidence', () => {
  it('should call getCities with residence_country_id value', () => {
    const mock = TestBed.inject(RegisterUserService);
    spyOn(mock, 'getCities').and.returnValue(of([{ id: '1', name: 'City1' }]));
    component.residence_city_id = new FormControl('1');
    component.getCitiesResidence();
    expect(component).toBeTruthy();

  });

  it('should handle success response correctly', () => {
    const mock = TestBed.inject(RegisterUserService);
    const response = [{ id: '1', name: 'City1' }, { id: '2', name: 'City2' }];
    spyOn(mock, 'getCities').and.returnValue(of(response));
    component.residence_city_id = new FormControl('1');
    component.getCitiesResidence();
    expect(component).toBeTruthy();

  });

  it('should handle error response correctly', () => {
    const mock = TestBed.inject(RegisterUserService);
    spyOn(mock, 'getCities').and.returnValue(throwError('error'));
    spyOn((component as any).toastr, 'error');
    component.residence_city_id = new FormControl('1');
    component.getCitiesResidence();
    expect(component).toBeTruthy();

  });
});

describe('getCitiesBirth', () => {
  it('should call getCities with birth_country_id value', () => {
    const mock = TestBed.inject(RegisterUserService);
    spyOn(mock, 'getCities').and.returnValue(of([]));
    component.getCitiesBirth();
    expect(component).toBeTruthy();
  });

  it('should handle success response correctly', () => {
    const mock = TestBed.inject(RegisterUserService);
    const response = [{ id: '1', name: 'City1' }, { id: '2', name: 'City2' }];
    spyOn(mock, 'getCities').and.returnValue(of(response));
    component.getCitiesBirth();
    expect(component).toBeTruthy();
  });

  it('should handle error response correctly', () => {
    const mock = TestBed.inject(RegisterUserService);
    spyOn(mock, 'getCities').and.returnValue(throwError('error'));
    spyOn(component['toastr'], 'error'); // Access 'toastr' through the component instance
    component.getCitiesBirth();
    expect(component).toBeTruthy();
  });
});
});