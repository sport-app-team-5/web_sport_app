import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from './login.service'
import { jwtDecode } from 'jwt-decode'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule]
})
export class LoginComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email])
    password = new FormControl('', [Validators.required])
    formData: any = {}

    constructor (
        private toastr: ToastrService,
        private translate: TranslateService,
        private loginService: LoginService,
        private router: Router
    ) {}

    ngOnInit () {
        this.switchLanguage('es')
    }
    goToRegister () {
        this.router.navigate(['/register'])
    }

    switchLanguage (language: string): void {
        this.translate.use(language)
    }

    passwordValidator (control: FormControl): { [key: string]: boolean } | null {
        const value: string = control.value || ''
        const hasNumber = /\d/.test(value)
        const hasLetter = /[a-zA-Z]/.test(value)
        const valid = value && hasNumber && hasLetter
        return valid ? null : { invalidPassword: true }
    }

    changeValueForm (e: any) {
        const name = e.target.name
        const value = e.target.value
        this.formData[name] = value
        console.log(this.email.errors)
    }

    userLogin () {
        if (this.email.value && this.password.value) {
            this.loginService.login(this.formData).subscribe({
                next: this.handleUpdateResponse.bind(this),
                error: this.handleError.bind(this)
            })
        } else {
            this.email.markAsTouched()
            this.password.markAsTouched()
        }
    }

    handleUpdateResponse (response: any) {
        if (typeof response.access_token !== 'string') {
            console.error(
                'Access token is not a string:',
                response.access_token
            )
            return
        }

        sessionStorage.setItem('access_token', response.access_token)
        const decoded = jwtDecode<any>(response.access_token)
        sessionStorage.setItem('role', decoded.role)
        this.toastr.success('Inicio de sesión éxitoso', 'Éxito', {
            timeOut: 3000
        })
        this.router.navigate(['/home'])
    }

    handleError (error: any) {
        let text = 'Error en el logueo del usuario'
        if (error.status === 400) {
            if (error.error.detail === 'Incorrect username or password') {
                text = 'Usuario o contraseña incorrecto'
            }
        }

        this.toastr.error(text, 'Error', {
            timeOut: 3000
        })
    }
}
