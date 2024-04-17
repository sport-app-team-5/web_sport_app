import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nutritional-profile-list',
  templateUrl: './nutritional-profile-list.component.html',
  styleUrls: ['./nutritional-profile-list.component.css']
})
export class NutritionalProfileListComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  foodList: any = [];

  ngOnInit() {
    this.switchLanguage('es')
    this.foodList = [{
      "name": "Alergia alimenticia",
      "description": "Zanahoria",
      "created_at": new Date('2024-04-16')
    },
    {
      "name": "Dieta",
      "description": "Carnivora",
      "created_at": new Date('2024-04-15')
    }]
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

}
