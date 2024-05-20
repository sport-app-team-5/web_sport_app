import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  formData: any = {};
  language: string = 'es';

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private loginService: LoginService,
    private dashboardService: DashboardService,
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
  }
  switchLanguage (event: any): void {
    const value = event.target.value;
    this.translate.use(value)
  }

  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value || '';
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    const valid = value && hasNumber && hasLetter;
    return valid ? null : { invalidPassword: true };
  }

  changeValueForm(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    this.formData[name] = value;
  }

  userLogin() {
    if (this.email.value && this.password.value) {
      this.loginService.login(this.formData).subscribe({
        next: this.handleUpdateResponse.bind(this),
        error: this.handleError.bind(this),
      });
    } else {
      this.email.markAsTouched();
      this.password.markAsTouched();
    }
  }

  handleUpdateResponse(response: any) {
    if (typeof response.access_token !== 'string') {
      console.error('Access token is not a string:', response.access_token);
      return;
    }
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = response.access_token;
      sessionStorage.setItem('access_token', token);
      const decoded = jwtDecode<any>(response.access_token);
      let role = decoded.role;
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('user_id', decoded.sub);
      this.toastr.success('Inicio de sesión éxitoso', 'Éxito', {
        timeOut: 3000,
      });
      if (role === 'DEPO') {
        this.dashboardService.getProfile(token).subscribe({
          next: (res) => {
            sessionStorage.setItem('sportman_id', res.id);
            if (res.detail == 'Sport man not have risk') {
              this.router.navigate(['/sports-information']);
            } else {
              this.router.navigate(['/home']);
            }
          },
          error: () => {
            console.log('error');
          },
        });
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  handleError(error: any) {
    let text = 'Error en el logueo del usuario';
    if (error.status === 400) {
      if (error.error.detail === 'Incorrect username or password') {
        text = 'Usuario o contraseña incorrecto';
      }
    }

    this.toastr.error(text, 'Error', {
      timeOut: 3000,
    });
  }

  goToRegistry () {
    this.router.navigate(['/register'])
  }

  goToLogin () {
    this.router.navigate(['/login'])
  }
}
