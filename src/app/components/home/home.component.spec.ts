import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomeComponent } from './home.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import {
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore
} from '@ngx-translate/core'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let router: Router
  let translateService: jasmine.SpyObj<TranslateService>

  beforeEach(async () => {
    const translateSpy = jasmine.createSpyObj('TranslateService', ['instant'])
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule],
      providers: [
        TranslateLoader,
        TranslateCompiler,
        TranslateParser,
        MissingTranslationHandler,
        TranslateService,
        TranslateStore,
        {
          provide: 'es'
        },
        { provide: TranslateService, useValue: translateSpy }
      ]
    }).compileComponents()

    router = TestBed.inject(Router)
    translateService = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
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
