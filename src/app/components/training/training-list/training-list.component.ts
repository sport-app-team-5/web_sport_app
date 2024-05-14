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
  }

  switchLanguage(language: string): void {
    this.translate.use(language)
  }

  getTrainings() {
    this.trainingService.getTrainings().subscribe({
      next: (response) => {this.trainings = response },
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
    if (value) {
      return 'Si'
    }
    else {
      return 'No'
    }
  }
}

