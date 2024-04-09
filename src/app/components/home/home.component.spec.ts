import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { ActivatedRoute, Router } from '@angular/router'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core'
import { HttpLoaderFactory } from '../../app.config'
import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let router: Router
  let translateService: TranslateService

  beforeEach(async () => {
    const translateSpy = jasmine.createSpyObj('TranslateService', ['instant'])
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        TranslateService
,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map().set('id', '123') // Mocking snapshot data if needed
            }
          }
        }
      ]
    }).compileComponents()

    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(HomeComponent)

    component = fixture.componentInstance

    translateService = TestBed.inject(TranslateService)

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to /register when goToRegistry is called', () => {
    const navigateSpy = spyOn(router, 'navigate')
    component.goToRegitry()
    expect(navigateSpy).toHaveBeenCalledWith(['/register'])
  })

 

})
