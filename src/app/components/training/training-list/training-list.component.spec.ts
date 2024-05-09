import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../../app.config";
import {HttpClient} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {TrainingListComponent} from "./training-list.component";
import {TrainingService} from "../training.service";

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;
  let toastrService: ToastrService;
  let translateService: TranslateService;
  let trainingService: TrainingService;

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
    const trainingSugestions = [
      { id: 3, name: 'Training 3' },
      { id: 4, name: 'Training 4' }
    ];
  
    spyOn(trainingService, 'getTrainings').and.returnValue(of(trainingsBySportMan));
    spyOn(trainingService, 'getTrainingsSugetions').and.returnValue(of(trainingSugestions));
  
    component.getTrainings();  
  
    expect(trainingService.getTrainings).toHaveBeenCalled();
    expect(trainingService.getTrainingsSugetions).toHaveBeenCalledWith(component.isChecked);
    expect(component.trainings).toEqual(trainingsBySportMan.concat(trainingSugestions));
    
  });
  
  it('should handle error when getting training suggestions', () => {    
    spyOn(trainingService, 'getTrainings').and.returnValue(of([]));
    spyOn(trainingService, 'getTrainingsSugetions').and.returnValue(throwError('error'));
  
    component.getTrainings();
    expect(trainingService.getTrainings).toHaveBeenCalled();
    expect(trainingService.getTrainingsSugetions).toHaveBeenCalledWith(component.isChecked);
    expect(component.trainings).toEqual([]);

  });
  
  it('should handle error from getTrainings', () => {
    spyOn(trainingService, 'getTrainings').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(trainingService.getTrainings).toHaveBeenCalled();
    // Aquí puedes agregar más expectativas para verificar que tu componente maneja correctamente el error
  });
});
