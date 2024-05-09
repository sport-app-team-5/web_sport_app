import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferServiceComponent } from './offer-service.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main/main.service';
import { OfferServiceService } from './offer-service.service';

describe('OfferServiceComponent', () => {
  let component: OfferServiceComponent;
  let fixture: ComponentFixture<OfferServiceComponent>;
  let mainService: MainService
  let checkService:OfferServiceService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        OfferServiceComponent,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OfferServiceComponent);
    component = fixture.componentInstance;
    mainService = TestBed.inject(MainService);
    checkService = TestBed.inject(OfferServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change menu option', () => {
    component.changeMenuOption();
    expect(component.isActiveMenu).toBe('home');
  });

  it('should change inside home', () => {
    const event = {}; 
    const checkServiceSpy = spyOn(checkService, 'changeCheck');
    component.changeInsideHome(event);
    expect(component.isChecked).toBe(true);
    expect(checkServiceSpy).toHaveBeenCalledWith(component.isChecked);
  });

});
