import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { NutritionalProfileListService } from './nutritional-profile-list.service';

@Component({
  selector: 'app-nutritional-profile-list',
  standalone: true,
  imports: [NgForOf, NgIf, ReactiveFormsModule, TranslateModule],
  templateUrl: './nutritional-profile-list.component.html',
  styleUrls: ['./nutritional-profile-list.component.css']
})
export class NutritionalProfileListComponent implements OnInit {
  foodList: any[] = [];
  questiontype: string = '';
  answerProfile: string = '';
  formTitle: string = '';
  formDescription: string = '';
  sportManNutritionalProfile: any;
  language: string = 'es';

  constructor(
    private nutritionalProfileListService: NutritionalProfileListService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router
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
    this.questiontype = "Tipo";
    this.answerProfile = "Nombre";
    this.formTitle = "Tu información";
    this.formDescription = "Encontrarás tus datos personales de tu perfil alimenticio";
    this.getData();
  }

  switchLanguage(language: string): void {
    this.translate.use(language)
    localStorage.setItem('lang', language);
  }

  getData() {
    this.nutritionalProfileListService.getNutritionalProfileService().subscribe({
      next: (response) => {
        console.log(response);
        this.sportManNutritionalProfile = response;
        this.sportManNutritionalProfile.allergies.forEach((element: any) => {
          this.foodList.push({
            name: element.name,
            description: element.description
          });
        });

        this.foodList.push({
          name: "Dieta",
          description: this.sportManNutritionalProfile.food_preference
        });

      },
      error: () => {
        this.toastr.error('Error obteniendo el perfil nutricional', 'Error', {
          timeOut: 3000
        });
      }
    })
  }

  goToHome() {
    this.router.navigate(['/'])
  }
}
