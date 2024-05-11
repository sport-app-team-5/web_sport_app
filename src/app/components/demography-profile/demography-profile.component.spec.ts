import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographyProfileComponent } from './demography-profile.component';

describe('DemographyProfileComponent', () => {
  let component: DemographyProfileComponent;
  let fixture: ComponentFixture<DemographyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemographyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
