import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clasification-risk-group',
  templateUrl: './clasification-risk-group.component.html',
  styleUrls: ['./clasification-risk-group.component.css'],
  standalone: true
})
export class ClasificationRiskGroupComponent implements OnInit {

  planList: any = [];

  constructor() { }

  ngOnInit() {
    this.planList = [];
  }

  selectPlan(plan: string) {
    throw new Error('Method not implemented.');
  }

}
