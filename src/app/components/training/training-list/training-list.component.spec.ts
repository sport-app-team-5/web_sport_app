import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../../app.config";
import {HttpClient} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {TrainingListComponent} from "./training-list.component";
import {TrainingService} from "../training.service";
import { Router } from '@angular/router';

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;
  let toastrService: ToastrService;
  let translateService: TranslateService;
  let trainingService: TrainingService;
  let router: Router;

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
    fixture = TestBed.createComponent(TrainingListComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    translateService = TestBed.inject(TranslateService);
    trainingService = TestBed.inject(TrainingService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language', () => {
    spyOn(translateService, 'use');
    component.switchLanguage('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should get trainings', () => {
    const trainingsBySportMan = [
      { id: 1, name: 'Training 1' },
      { id: 2, name: 'Training 2' }
    ];

    spyOn(trainingService, 'getTrainings').and.returnValue(of(trainingsBySportMan));

    component.getTrainings();

    expect(trainingService.getTrainings).toHaveBeenCalled();
  });

  it('should handle error when getting training suggestions', () => {
    spyOn(trainingService, 'getTrainings').and.returnValue(of([]));

    component.getTrainings();
    expect(trainingService.getTrainings).toHaveBeenCalled();
    expect(component.trainings).toEqual([]);
  });

  it('should handle error from getTrainings', () => {
    spyOn(trainingService, 'getTrainings').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(trainingService.getTrainings).toHaveBeenCalled();
  });
  it('should navigate to /create-training when createTraining is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.createTraining();
    expect(navigateSpy).toHaveBeenCalledWith(['/create-training']);
  });

  it('should return "Si" when getValueOfInsideHouse is called with true', () => {
    const result = component.getValueOfInsideHouse(true);
    expect(result).toEqual('Si');
  });

  it('should return "No" when getValueOfInsideHouse is called with false', () => {
    const result = component.getValueOfInsideHouse(false);
    expect(result).toEqual('No');
  });
});
