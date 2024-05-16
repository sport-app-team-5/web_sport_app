/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderMainService } from './header-main.service'
import { HeaderMainComponent } from './header-main.component'
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HeaderMainComponent', () => {
  let component: HeaderMainComponent
  let fixture: ComponentFixture<HeaderMainComponent>
  let headerMainService: HeaderMainService;
  let translateService: TranslateService
  let httpMock: HttpTestingController

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        HeaderMainComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })],
      providers:[HeaderMainService, TranslateService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMainComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should call openMenu', () => {
    const instance = {
      isOpenMenu: false,
      openMenu: component.openMenu
    }
    instance.openMenu()
    expect(instance.isOpenMenu).toBe(true)
  })

  it('should call showProfile', () => {
    let mock = TestBed.inject(HeaderMainService)
    spyOn(mock, 'setIsActiveProfile').and.returnValue()
    component.showProfile()
    expect(component.isActiveProfile).toBe(true)
  })

  it('should return correct class when isOpenMenu is true', async () => {
    let res = component.openMenuClass()
    expect(res.menu).toBe(true)
  })
})
