import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'

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

    constructor (
        private toastr: ToastrService,
        private translate: TranslateService
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
    }
}
