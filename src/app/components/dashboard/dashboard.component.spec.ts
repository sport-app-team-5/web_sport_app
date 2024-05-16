import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {HttpLoaderFactory} from "../../app.config";
import {Observable, of} from "rxjs";
import {DashboardComponent} from "./dashboard.component";
import {DashboardService} from "./dashboard.service";

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>
  let nutritionalInformationService: DashboardService
  let translateService: TranslateService

  const fakeService1 = {
    getProfile (): Observable<any[]> {
      return of([
        { id: 1, name: 'Country1' },
        { id: 2, name: 'Country2' }
      ])
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
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
      ],
      providers: [DashboardService]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    nutritionalInformationService = TestBed.inject(DashboardService)
    translateService = TestBed.inject(TranslateService)
    fixture.detectChanges()
  })

  describe('validate profile', () => {
    it('should get profile info', () => {
      let mock = TestBed.inject(DashboardService)
      spyOn(mock, 'getProfile').and.returnValue(fakeService1.getProfile())
      component.getProfile()
      expect(component).toBeTruthy()
    })

    it('should switch the language and update localStorage', () => {
      const language = 'en';
      spyOn(component.translate, 'use');
      spyOn(localStorage, 'setItem');
      component.switchLanguage(language);
      expect(component.translate.use).toHaveBeenCalledWith(language);
      expect(localStorage.setItem).toHaveBeenCalledWith('lang', language);
    });

  });
})
