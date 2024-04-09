import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalInformationComponent } from './nutritional-information.component';

describe('NutritionalInformationComponent', () => {
  let component: NutritionalInformationComponent;
  let fixture: ComponentFixture<NutritionalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionalInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutritionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
