import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DashboardService} from "./dashboard.service";
import {NgForOf} from "@angular/common";
import {Dashboard } from './dashboard';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  language: string = 'es';
  constructor (
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {}

  profile: Dashboard | undefined

  events= [
    { name: "Runner", date: "10-12-2024" },
    { name: "Ciclismo", date: "11-12-2024" }
  ];

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
     this.getProfile()
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
    localStorage.setItem('lang', language);
  }

  getProfile(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token= sessionStorage.getItem('acces_token')
      this.dashboardService.getProfile(token).subscribe({
        next: (response) => {this.profile = response},
        error: () => {
          this.toastr.error('Error obteniendo el perfil', 'Error', {
            timeOut: 3000
          });
        }
      });
    }

  }
}
