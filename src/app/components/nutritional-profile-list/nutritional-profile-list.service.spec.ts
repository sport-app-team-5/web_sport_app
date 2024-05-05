import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NutritionalProfileListComponent } from './nutritional-profile-list.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { NutritionalProfileListService } from './nutritional-profile-list.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";

describe('NutritionalProfileListComponent', () => {
  let component: NutritionalProfileListComponent;
  let fixture: ComponentFixture<NutritionalProfileListComponent>;
  let nutritionalProfileListService: NutritionalProfileListService;
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
    fixture = TestBed.createComponent(NutritionalProfileListComponent);
    component = fixture.componentInstance;
    nutritionalProfileListService = TestBed.inject(NutritionalProfileListService);
    toastrService = TestBed.inject(ToastrService);
    translateService = TestBed.inject(TranslateService);
    spyOn(translateService, 'use'); // Espía el método use de TranslateService
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language', () => {
    const language = 'en';
    component.switchLanguage(language);
    expect(translateService.use).toHaveBeenCalledWith(language);
  });

  it('should handle data retrieval successfully', () => {
    const mockData = {
      allergies: [
        { name: 'Peanuts', description: 'Allergic to peanuts' }
      ],
      food_preference: 'Balanced diet'
    };
    spyOn(nutritionalProfileListService, 'getNutritionalProfileService').and.returnValue(of(mockData));

    component.getData();

    expect(component.foodList).toEqual([
      { name: 'Peanuts', description: 'Allergic to peanuts' },
      { name: 'Dieta', description: 'Balanced diet' }
    ]);
  });

  it('should handle error during data retrieval', () => {
    spyOn(nutritionalProfileListService, 'getNutritionalProfileService').and.returnValue(throwError('Error fetching data'));
    spyOn(toastrService, 'error');

    component.getData();

    expect(toastrService.error).toHaveBeenCalledWith('Error obteniendo el perfil nutricional', 'Error', {
      timeOut: 3000
    });
  });
});
