import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { CasificationRiskGroupService } from './casification-risk-group.service'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clasification-risk-group',
  templateUrl: './clasification-risk-group.component.html',
  styleUrls: ['./clasification-risk-group.component.css'],
  imports: [CommonModule, TranslateModule],
  standalone: true
})
export class ClasificationRiskGroupComponent implements OnInit {

  risk: string = '';
  sportManRisk: string = '';
  recommendedPlan: string = '(Recomendado)';
  recommendedBasicPlan: string = '';
  recommendedMediunPlan: string = '';
  recommendedAdvancePlan: string = '';

  activePlan: string = '';
  basicPlanList: any = [];
  mediunPlanList: any = [];
  advancePlanList: any = [];

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private casificationRiskGroupService: CasificationRiskGroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setBasicPlanList();
    this.setMediunPlanList();
    this.setAdvancePlanList();

    this.switchLanguage('es');
    this.getData();
  }

  switchLanguage(language: string): void {
    this.translate.use(language)
  }

  setRecommendedPlan() {
    this.recommendedBasicPlan = '';
    this.recommendedMediunPlan = '';
    this.recommendedAdvancePlan = '';

    if (this.sportManRisk === 'Sin riesgo') {
      this.recommendedBasicPlan = this.recommendedPlan;
    } else if (this.sportManRisk === 'Riesgo Medio') {
      this.recommendedMediunPlan = this.recommendedPlan;
    } else if (this.sportManRisk === 'Riesgo Alto') {
      this.recommendedAdvancePlan = this.recommendedPlan;
    }
  }

  getData() {
    this.casificationRiskGroupService.getRiskGroupService().subscribe({
      next: (response) => {
        this.sportManRisk = response.risk;
        sessionStorage.setItem('sportman_id', response.id);
        this.setRecommendedPlan();
      },
      error: () => {
        this.toastr.error('Error obteniendo el riesgo', 'Error', {
          timeOut: 3000
        });
      }
    })
  }

  selectPlan(plan: string) {
    this.activePlan = plan;
    this.router.navigate(['/home']);  
  }


  getPlanClassesSelected(value: string) {
    return {
      'column': true,
      'columnSelected': this.activePlan === value
    }
  }

  handleKeyDown($event: KeyboardEvent) {
    this.risk = "Riesgo gourmet";
  }

  setBasicPlanList() {
    this.basicPlanList = [{ "feature": "Seleccionar un plan" },
    { "feature": "Agregar perfil deportivo" },
    { "feature": "Agregar perfil alimenticio" },
    { "feature": "Agregar perfil demográfico" },
    { "feature": "Crear plan de entrenamiento" },
    { "feature": "Realizar plan de entrenamiento" },
    { "feature": "Inscribirse a eventos deportivos" }];
  }

  setMediunPlanList() {
    this.mediunPlanList = [{ "feature": "Seleccionar un plan" },
    { "feature": "Agregar perfil deportivo" },
    { "feature": "Agregar perfil alimenticio" },
    { "feature": "Agregar perfil demográfico" },
    { "feature": "Crear plan de entrenamiento" },
    { "feature": "Realizar plan de entrenamiento" },
    { "feature": "Inscribirse a eventos deportivos" },
    { "feature": "Recibir alertas de indicadores" },
    { "feature": "Recibir sugerencias de eventos" },
    { "feature": "Pago mensual de membresia" }];
  }

  setAdvancePlanList() {
    this.advancePlanList = [{ "feature": "Seleccionar un plan" },
    { "feature": "Agregar perfil deportivo" },
    { "feature": "Agregar perfil alimenticio" },
    { "feature": "Agregar perfil demográfico" },
    { "feature": "Crear plan de entrenamiento" },
    { "feature": "Realizar plan de entrenamiento" },
    { "feature": "Inscribirse a eventos deportivos" },
    { "feature": "Recibir alertas de indicadores" },
    { "feature": "Recibir sugerencias de eventos" },
    { "feature": "Agendar citas con deportologos" },
    { "feature": "Entrenamiento personalizado" },
    { "feature": "Pago anual de membresia" }];
  }

}
