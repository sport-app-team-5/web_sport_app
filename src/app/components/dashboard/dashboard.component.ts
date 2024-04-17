import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TranslateModule
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

  profile: any[] = []

  ngOnInit() {
    this.switchLanguage('es')
    this.getProfile()
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  getProfile(): void {
    this.dashboardService.getProfile().subscribe({
      next: (response) => {this.profile = response },
      error: () => {
        this.toastr.error('Error obteniendo el perfil', 'Error', {
          timeOut: 3000
        });
      }
    });
  }
}
