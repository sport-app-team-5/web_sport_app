import { ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../app.config";
import {ScheduleAppointmentComponent} from "./schedule-appointment.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ScheduleAppointmentService} from "./schedule-appointment.service";

describe('ScheduleAppointmentComponent', () => {
  let component: ScheduleAppointmentComponent
  let fixture: ComponentFixture<ScheduleAppointmentComponent>
  let translateService: TranslateService
  let toastrService: ToastrService
  let scheduleAppointmentService: ScheduleAppointmentService
  let cost: FormControl
  let description: FormControl
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduleAppointmentService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ],
      imports: [
        ScheduleAppointmentComponent,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAppointmentComponent)
    component = fixture.componentInstance
    // scheduleAppointmentService = TestBed.inject(ScheduleAppointmentService)
    // translateService = TestBed.inject(TranslateService)

    fixture.detectChanges()
    // cost = new FormControl('', [Validators.required])
    // description = new FormControl('', [Validators.required])
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })


})
