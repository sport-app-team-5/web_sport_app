import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AdditionalServiceService } from '../additionalservice/additional-service.service';
import { AdditionalserviceComponent } from "../additionalservice/additionalservice.component";

@Component({
    selector: 'app-additionalservice-list',
    templateUrl: './additionalservice-list.component.html',
    styleUrls: ['./additionalservice-list.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule, ReactiveFormsModule, AdditionalserviceComponent]
})
export class AdditionalserviceListComponent implements OnInit {
  additionalServices: any = [];
  language: string = 'es';
  creatingAdditionalService: boolean = false;

  constructor(
    public toastr: ToastrService,
    public translate: TranslateService,
    public additionalServiceService: AdditionalServiceService,
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

    this.creatingAdditionalService = false;
    this.getAdditionalServices();
  }

  getAdditionalServices() {
    this.additionalServiceService.getAdditionalService().subscribe({
      next: (response) => {
        this.additionalServices = response;
      } ,
      error: (err) => {
         this.toastr.error('Error obteniendo los servicios', 'Error', {
        timeOut: 3000
      });
    }
    })
  }

  createService() {
    this.creatingAdditionalService = true;
  }

  closeWindow(){
    this.creatingAdditionalService = false;
  }
}
