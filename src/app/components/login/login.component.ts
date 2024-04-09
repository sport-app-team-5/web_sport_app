import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { LoginService } from './login.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule]
})
export class LoginComponent implements OnInit {
    email = new FormControl('', [Validators.required])
    password = new FormControl('', [Validators.required])
    formData: any = {}

    constructor (
        private toastr: ToastrService,
        private translate: TranslateService,
        private loginService: LoginService
    ) {}

    ngOnInit () {
        this.switchLanguage('es')
    }

    switchLanguage (language: string): void {
        this.translate.use(language)
    }

    changeValueForm (e: any) {
        const name = e.target.name
        const value = e.target.value
        this.formData[name] = value
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

    handleUpdateResponse () {
        this.toastr.success('Inicio de sesión éxitoso', 'Toastr fun!', {
            timeOut: 3000
        })
    }

    handleError (error: any) {
        let text = 'Error en el logueo del usuario'
        if (error.status === 400) {
            if (error.error.detail === 'Incorrect username or password') {
                text = 'Usuario o contraseña incorrecto'
            }
        }

        this.toastr.error(text, 'Major Error', {
            timeOut: 3000
        })
    }
}
