/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SportplanComponent } from './sportplan.component';

describe('SportplanComponent', () => {
  let component: SportplanComponent;
  let fixture: ComponentFixture<SportplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
