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
  constructor (
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  profile: Dashboard | undefined

  events= [
    { name: "Runner", date: "10-12-2024" },
    { name: "Ciclismo", date: "11-12-2024" }
  ];

  ngOnInit() {
    this.switchLanguage('es')
    this.getProfile()
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  getProfile(): void {
    this.dashboardService.getProfile().subscribe({
      next: (response) => {this.profile = response},
      error: () => {
        this.toastr.error('Error obteniendo el perfil', 'Error', {
          timeOut: 3000
        });
      }
    });
  }
}
