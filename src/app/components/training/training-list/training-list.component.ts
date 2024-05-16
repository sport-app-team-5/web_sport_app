import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { TrainingService } from "../training.service";
import { OfferServiceService } from '../../offer-service/offer-service.service';
import { TrainingCreateComponent } from '../training-create/training-create.component';

@Component({
  selector: 'app-training-list',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    TrainingCreateComponent,
    CommonModule
  ],
  templateUrl: './training-list.component.html',
  styleUrl: './training-list.component.css'
})
export class TrainingListComponent implements OnInit {
  trainings: any[] = [];
  isChecked: boolean = false;
  language: string = 'es';
  creatingTraining: boolean = false;
  constructor(
    private trainingService: TrainingService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private checkService: OfferServiceService
  ) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      let idioma = localStorage.getItem('lang');
      if (idioma != null) {
        this.translate.setDefaultLang(idioma);
        this.language = idioma;
      } else {
        this.translate.setDefaultLang('es');
        this.language = 'es';
      }
    }
    this.getTrainings();
 

  }

  switchLanguage(language: string): void {
    this.translate.use(language)
  }

  getTrainings() {
    let checked: any
    this.checkService.getCheck().subscribe((value) => {
      checked = (value)

      this.trainingService.getTrainings().subscribe({
        next: (trainingsBySportMan) => {
          this.trainingService.getTrainingsSugetions(checked).subscribe({
            next: (trainingSugestions) => {
              this.trainings = trainingsBySportMan
              let trainingRecommended = trainingSugestions.map((training: any) => ({
                ...training,
                recommended: "Si"
              }));
              this.trainings = this.trainings.concat(trainingRecommended)
            },
            error: (err) => {
              this.toastr.error('Error obteniendo las sugerencias de entrenamiento', 'Error', {
                timeOut: 3000
              });
            }
          })
        },
        error: (err) => {
          this.toastr.error('Error obteniendo los entrenamientos', 'Error', {
            timeOut: 3000
          });
        }
      });
    });
  }

  createTraining() {
    this.creatingTraining=true;
    // this.router.navigate(['/create-training'])
  }

  getValueOfInsideHouse(value: any) {
    if (value) {
      return 'Si'
    }
    else {
      return 'No'
    }
  }

  closeWindow(){
    this.creatingTraining=false
  }
}

