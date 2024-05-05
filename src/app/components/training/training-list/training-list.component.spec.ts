import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../../app.config";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {TrainingListComponent} from "./training-list.component";
import {TrainingService} from "../training.service";

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;
  let toastrService: ToastrService;
  let translateService: TranslateService;

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

  it('should get trainings successfully', () => {
    const mockTrainings = [{ id: 1, name: 'Training 1' }, { id: 2, name: 'Training 2' }];
    const trainingService = TestBed.inject(TrainingService);
    spyOn(trainingService, 'getTrainings').and.returnValue(of(mockTrainings));

    component.getTrainings();

    expect(component.trainings).toEqual(mockTrainings);
  });
});
