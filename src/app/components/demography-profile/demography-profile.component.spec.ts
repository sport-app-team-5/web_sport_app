import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {Observable, of} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {HttpLoaderFactory} from "../../app.config";
import {DemographyProfileComponent} from "./demography-profile.component";
import {DemographyProfileService} from "./demography-profile.service";

describe('DemographyProfileComponent', () => {
  let component: DemographyProfileComponent
  let fixture: ComponentFixture<DemographyProfileComponent>
  let demographyProfileService: DemographyProfileService
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
        DemographyProfileComponent,
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
      providers: [DemographyProfileService]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographyProfileComponent)
    component = fixture.componentInstance
    demographyProfileService = TestBed.inject(DemographyProfileService)
    translateService = TestBed.inject(TranslateService)
    fixture.detectChanges()
  })

  describe('validate profile', () => {
    it('should get profile info', () => {
      let mock = TestBed.inject(DemographyProfileService)
      spyOn(mock, 'getProfile').and.returnValue(fakeService1.getProfile())
      component.getProfile()
      expect(component).toBeTruthy()
    })
  })
})

