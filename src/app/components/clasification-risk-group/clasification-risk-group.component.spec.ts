/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificationRiskGroupComponent } from './clasification-risk-group.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { CasificationRiskGroupService } from './casification-risk-group.service'
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('ClasificationRiskGroupComponent', () => {
  let component: ClasificationRiskGroupComponent;
  let service: CasificationRiskGroupService
  let fixture: ComponentFixture<ClasificationRiskGroupComponent>;
  let clasificationRiskServiceSpy: jasmine.SpyObj<CasificationRiskGroupService>
  let httpMock: HttpTestingController
  let toastr: ToastrService
  let translateService: TranslateService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [CasificationRiskGroupService,TranslateService]
    })

    service = TestBed.inject(CasificationRiskGroupService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificationRiskGroupComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CasificationRiskGroupService)
    httpMock = TestBed.inject(HttpTestingController)
    translateService = TestBed.inject(TranslateService)
    toastr = TestBed.inject(ToastrService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set basicPlanList correctly', () => {
    component.setBasicPlanList();
    expect(component.basicPlanList).toEqual([
      {"feature":"Seleccionar un plan"},
      {"feature":"Agregar perfil deportivo"},
      {"feature":"Agregar perfil alimenticio"},
      {"feature":"Agregar perfil demográfico"},
      {"feature":"Crear plan de entrenamiento"},
      {"feature":"Realizar plan de entrenamiento"},
      {"feature":"Inscribirse a eventos deportivos"}
    ]);
  });

  it('should set mediunPlanList correctly', () => {
    component.setMediunPlanList();
    expect(component.mediunPlanList).toEqual([
      {"feature":"Seleccionar un plan"},
      {"feature":"Agregar perfil deportivo"},
      {"feature":"Agregar perfil alimenticio"},
      {"feature":"Agregar perfil demográfico"},
      {"feature":"Crear plan de entrenamiento"},
      {"feature":"Realizar plan de entrenamiento"},
      {"feature":"Inscribirse a eventos deportivos"},
      {"feature":"Recibir alertas de indicadores"},
      {"feature":"Recibir sugerencias de eventos"},
      {"feature":"Pago mensual de membresia"}
    ]);
  });


  it('should set advancePlanList correctly', () => {
    component.setAdvancePlanList();
    expect(component.advancePlanList).toEqual([
      {"feature":"Seleccionar un plan"},
      {"feature":"Agregar perfil deportivo"},
      {"feature":"Agregar perfil alimenticio"},
      {"feature":"Agregar perfil demográfico"},
      {"feature":"Crear plan de entrenamiento"},
      {"feature":"Realizar plan de entrenamiento"},
      {"feature":"Inscribirse a eventos deportivos"},
      {"feature":"Recibir alertas de indicadores"},
      {"feature":"Recibir sugerencias de eventos"},
      {"feature":"Agendar citas con deportologos"},
      {"feature":"Entrenamiento personalizado"},
      {"feature":"Pago anual de membresia"}
    ]);
  });
  it('should set recommendedBasicPlan when sportManRisk is "Sin riesgo"', () => {
    component.sportManRisk = 'Sin riesgo';
    component.recommendedPlan = 'Basic Plan';

    component.setRecommendedPlan();

    expect(component.recommendedBasicPlan).toEqual('Basic Plan');
    expect(component.recommendedMediunPlan).toEqual('');
    expect(component.recommendedAdvancePlan).toEqual('');
  });

  it('should set recommendedMediunPlan when sportManRisk is "Riesgo Medio"', () => {
    component.sportManRisk = 'Riesgo Medio';
    component.recommendedPlan = 'Medium Plan';

    component.setRecommendedPlan();

    expect(component.recommendedBasicPlan).toEqual('');
    expect(component.recommendedMediunPlan).toEqual('Medium Plan');
    expect(component.recommendedAdvancePlan).toEqual('');
  });

  it('should set recommendedAdvancePlan when sportManRisk is "Riesgo Alto"', () => {
    component.sportManRisk = 'Riesgo Alto';
    component.recommendedPlan = 'Advance Plan';

    component.setRecommendedPlan();

    expect(component.recommendedBasicPlan).toEqual('');
    expect(component.recommendedMediunPlan).toEqual('');
    expect(component.recommendedAdvancePlan).toEqual('Advance Plan');
  });
});
