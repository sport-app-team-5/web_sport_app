import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../../app.config";
import {HttpClient} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {SuggestedTrainingListComponent} from "./suggested-training-list.component";
import {SuggestedTrainingService} from "../suggested-training.service";

describe('SuggestedSuggestedTrainingListComponent', () => {
  let component: SuggestedTrainingListComponent;
  let fixture: ComponentFixture<SuggestedTrainingListComponent>;
  let toastrService: ToastrService;
  let translateService: TranslateService;
  let trainingService: SuggestedTrainingService;
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
    fixture = TestBed.createComponent(SuggestedTrainingListComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    translateService = TestBed.inject(TranslateService);
    trainingService = TestBed.inject(SuggestedTrainingService);
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

    spyOn(trainingService, 'getSuggestedTrainings').and.returnValue(of(trainingsBySportMan));

    component.getSuggestedTrainings();

    expect(trainingService.getSuggestedTrainings).toHaveBeenCalled();
  });

  it('should handle error when getting training suggestions', () => {
    spyOn(trainingService, 'getSuggestedTrainings').and.returnValue(of([]));

    component.getSuggestedTrainings();
    expect(trainingService.getSuggestedTrainings).toHaveBeenCalled();
    expect(component.suggestedTrainings).toEqual([]);
  });

  it('should handle error from getSuggestedTrainings', () => {
    spyOn(trainingService, 'getSuggestedTrainings').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(trainingService.getSuggestedTrainings).toHaveBeenCalled();
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

