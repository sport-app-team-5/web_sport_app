import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { TrainingService } from "../training.service";
import { OfferServiceService } from '../../offer-service/offer-service.service';

@Component({
  selector: 'app-training-list',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule
  ],
  templateUrl: './training-list.component.html',
  styleUrl: './training-list.component.css'
})
export class TrainingListComponent implements OnInit {
  trainings: any[] = [];
  isChecked: boolean = false;

  constructor(
    private trainingService: TrainingService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
    private checkService: OfferServiceService
  ) { }

  ngOnInit() {
    this.switchLanguage('es');
    this.getTrainings();
    this.checkService.currentCheck.subscribe(value => this.isChecked = value);

  }

  switchLanguage(language: string): void {
    this.translate.use(language)
  }

  getTrainings() {
    let token = null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      token = sessionStorage.getItem('access_token');
    }
    this.trainingService.getTrainings().subscribe({
      next: (trainingsBySportMan) => {
        this.trainingService.getTrainingsSugetions(this.isChecked).subscribe({
          next: (trainingSugestions) => {
            this.trainings = trainingsBySportMan
            this.trainings = this.trainings.concat(trainingSugestions)
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
  }

  createTraining() {
    this.router.navigate(['/create-training'])
  }

  getValueOfInsideHouse(value: any) {
    if (value == true) {
      return 'Si'
    }
    else {
      return 'No'
    }
  }
}

