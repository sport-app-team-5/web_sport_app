import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "./register.component";
import { RegisterUserService } from "./registeruser.service";
import { ToastrService } from "ngx-toastr";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { beforeEach } from "node:test";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerUserService: RegisterUserService;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [
        { provide: RegisterUserService, useValue: jasmine.createSpyObj('RegisterUserService', ['createUser']) },
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success', 'error']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerUserService = TestBed.inject(RegisterUserService);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call nextStep when the continue button is clicked', () => {
    spyOn(component, 'nextStep');
    const button = fixture.debugElement.nativeElement.querySelector('.primary-button');
    button.click();
    expect(component.nextStep).toHaveBeenCalled();
  });

  it('should call backStep when the back button is clicked', () => {
    spyOn(component, 'backStep');
    const button = fixture.debugElement.nativeElement.querySelector('.secondary-button');
    button.click();
    expect(component.backStep).toHaveBeenCalled();
  });

  it('should update the email form control when input is changed', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input[name="email"]');
    input.value = 'test@example.com';
    input.dispatchEvent(new Event('change'));
    expect(component.email.value).toBe('test@example.com');
  });

  // Add more tests as needed...
});
