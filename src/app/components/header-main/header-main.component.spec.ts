/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { HeaderMainService } from './header-main.service'

import { HeaderMainComponent } from './header-main.component'

describe('HeaderMainComponent', () => {
  let component: HeaderMainComponent
  let fixture: ComponentFixture<HeaderMainComponent>
  let headerMainService: HeaderMainService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeaderMainComponent],
      providers:[HeaderMainService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMainComponent)
    component = fixture.componentInstance
    headerMainService = TestBed.inject(HeaderMainService);
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
