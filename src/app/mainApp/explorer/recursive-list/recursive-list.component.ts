import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recursive-list',
  templateUrl: './recursive-list.component.html',
  styleUrls: ['./recursive-list.component.scss']
})
export class RecursiveListComponent implements OnInit {

  @Input() folder: any;
  @Input() classId: number;
  @Input() color: String;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
