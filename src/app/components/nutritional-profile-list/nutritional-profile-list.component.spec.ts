/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NutritionalProfileListComponent } from './nutritional-profile-list.component';
import { NutritionalInformationService } from '../nutritional-information/nutritional-information.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpLoaderFactory } from '../../app.config';

describe('NutritionalProfileListComponent', () => {
  let component: NutritionalProfileListComponent;
  let fixture: ComponentFixture<NutritionalProfileListComponent>;  
  let translateService: TranslateService
  let toastrService: ToastrService
  let service: NutritionalInformationService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NutritionalProfileListComponent ,
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
        })],
      providers:[NutritionalInformationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionalProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
