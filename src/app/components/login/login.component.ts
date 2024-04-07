import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  constructor () {}

  ngOnInit () {}

  changeValueForm (e: any) {
    const name = e.target.name
    const value = e.target.value
  }
}
