import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms'
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';

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

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.switchLanguage('es')
    this.foodList = [{"name":"Alergia Alimentaria", "description":"Zanahoria"},
    {"name":"Dieta", "description":"Carnivora"}
    ];
    this.questiontype = "Tipo";
    this.answerProfile = "Nombre";
    this.formTitle = "Tu información";
    this.formDescription = "Encontrarás tus datos personales de tu perfil alimenticio";
    console.log(this.foodList)
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  goToHome() {
    this.router.navigate(['/'])
  }
}
