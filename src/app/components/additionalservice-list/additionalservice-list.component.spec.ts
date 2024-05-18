import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalserviceListComponent } from './additionalservice-list.component';
import { AdditionalServiceService } from '../additionalservice/additional-service.service';
import { Router } from 'express';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';

describe('AdditionalserviceListComponent', () => {
  let component: AdditionalserviceListComponent;
  let fixture: ComponentFixture<AdditionalserviceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
      AdditionalServiceService,
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigate'])
      }
    ],
    imports: [
      AdditionalserviceListComponent,
      HttpClientModule,
      HttpClientTestingModule,
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

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalserviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display additional services', () => {
    const additionalServices = [
      { id: 1, name: 'Service 1' },
      { id: 2, name: 'Service 2' },
      { id: 3, name: 'Service 3' }
    ];

    component.additionalServices = additionalServices;
    fixture.detectChanges();

    const serviceElements = fixture.debugElement.queryAll(By.css('.service-item'));
    expect(serviceElements.length).toBe(additionalServices.length);

    serviceElements.forEach((element: DebugElement, index: number) => {
      expect(element.nativeElement.textContent).toContain(additionalServices[index].name);
    });
  });

  it('should create additional service', () => {
    spyOn(component, 'createService');

    const createButton = fixture.debugElement.query(By.css('.create-button'));
    createButton.triggerEventHandler('click', null);

    expect(component.createService).toHaveBeenCalled();
  });

  it('should close window', () => {
    spyOn(component, 'closeWindow');

    const closeButton = fixture.debugElement.query(By.css('.close-button'));
    closeButton.triggerEventHandler('click', null);

    expect(component.closeWindow).toHaveBeenCalled();
  });


});


