import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {SuggestedTrainingService} from "../suggested-training.service";

@Component({
  selector: 'app-suggested-training-list',
  standalone: true,
    imports: [
        NgForOf,
        TranslateModule
    ],
  templateUrl: './suggested-training-list.component.html',
  styleUrl: './suggested-training-list.component.css'
})
export class SuggestedTrainingListComponent implements OnInit {
  suggestedTrainings: any[] = [];

  constructor(
    private suggestedTrainingService: SuggestedTrainingService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.switchLanguage('es');
    this.getSuggestedTrainings();
  }

  switchLanguage(language: string): void {
    this.translate.use(language)
  }

  getSuggestedTrainings() {
    this.suggestedTrainingService.getSuggestedTrainings(true).subscribe({
      next: (response) => {this.suggestedTrainings = response },
      error: (err) => {
        this.toastr.error('Error obteniendo los entrenamientos sugeridos', 'Error', {
          timeOut: 3000
        });
      }
    });
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
