import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CheckloginService } from '../services/checklogin.service';
import { RessourceService } from '../services/ressource.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mainapp',
  templateUrl: './mainapp.component.html',
  styleUrls: ['./mainapp.component.scss']
})
export class MainappComponent implements OnInit {

  classId: number;
  resId: Number;

  constructor(
    private log: CheckloginService,
    private router: Router,
    private user: UserService,
  ) { }

  async ngOnInit(): Promise<void> {

    
  }

}
