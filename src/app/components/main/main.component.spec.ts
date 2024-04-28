/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComponent } from './main.component';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MainComponent,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [ToastrService, TranslateService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to nutrional information', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.createNutritionalInfo();
    expect(navigateSpy).toHaveBeenCalledWith(['/nutritional-information']);
  });

  it('should go to create services', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.createService();
    expect(navigateSpy).toHaveBeenCalledWith(['/services']);
  });
  it('should setMenuAtive', () => {
    const instance = {
      isOpenMenu: true,
    };
    component.openMenu();
    expect(instance.isOpenMenu).toBe(true);
  });

  it('should setMenuAtive', () => {
    const instance = {
      isActiveMenu: true,
    };
    component.setMenuActive(false);

    expect(instance.isActiveMenu).toBe(true);
  });

  it('should go to create product', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.createProduct();
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should clear session storage and navigate to home', () => {
    const sessionStorageSpy = spyOn(sessionStorage, 'clear');
    const navigateSpy = spyOn(router, 'navigate');

    component.closeSession();

    expect(sessionStorageSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });


  it('should set menuKeyDown to true on key down event', () => {
    const event = new KeyboardEvent('keydown');
    component.handleKeyDown(event);
    expect(component.menuKeyDown).toBe(true);
  });
});
