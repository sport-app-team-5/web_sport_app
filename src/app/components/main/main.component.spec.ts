/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MainComponent } from './main.component'
import { Router } from '@angular/router'

describe('MainComponent', () => {
  let component: MainComponent
  let fixture: ComponentFixture<MainComponent>
  let router: Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent)
    component = fixture.componentInstance
    router = TestBed.inject(Router)

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should go to nutrional information', () => {
    const navigateSpy = spyOn(router, 'navigate')
    component.createNutritionalInfo()
    expect(navigateSpy).toHaveBeenCalledWith(['/nutritional-information'])
  })

  it('should go to create services', () => {
    const navigateSpy = spyOn(router, 'navigate')
    component.createService()
    expect(navigateSpy).toHaveBeenCalledWith(['/services'])
  })
  it('should setMenuAtive', () => {
    const instance = {
      isOpenMenu: true
    }
    component.openMenu()
    expect(instance.isOpenMenu).toBe(true)
  })

  it('should setMenuAtive', () => {
    const instance = {
      isActiveMenu: true
    }
    component.setMenuAtive(false)

    expect(instance.isActiveMenu).toBe(true)
  })

  it('should go to create product', () => {
    const navigateSpy = spyOn(router, 'navigate')
    component.createProduct()
    expect(navigateSpy).toHaveBeenCalledWith(['/products'])
  })

  it('should go to create event', () => {
    const navigateSpy = spyOn(router, 'navigate')
    component.createEvent()
    expect(navigateSpy).toHaveBeenCalledWith(['/events'])
  })

  
})
