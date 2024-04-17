import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms'
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nutritional-profile-list',
  standalone: true,
  imports: [NgForOf, NgIf, ReactiveFormsModule, TranslateModule],
  templateUrl: './nutritional-profile-list.component.html',
  styleUrls: ['./nutritional-profile-list.component.css']
})
export class NutritionalProfileListComponent implements OnInit {

foodList: any = [];
foodItem: any;
foodItem2: any;

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.switchLanguage('es')
    this.foodItem = {"name":"Alergia Alimentaria", "description":"Zanahoria", "create_at":"2024/04/01"};
    this.foodItem2 = {"name":"Dieta", "description":"Carnivora", "create_at":"2024/04/01"}
    this.foodList = {"foodItems":  [this.foodItem, this.foodItem2]}
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

}
