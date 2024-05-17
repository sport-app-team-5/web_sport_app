import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [TranslateModule]
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
