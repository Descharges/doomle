import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckloginService } from '../checklogin.service';

@Component({
  selector: 'app-mainapp',
  templateUrl: './mainapp.component.html',
  styleUrls: ['./mainapp.component.scss']
})
export class MainappComponent implements OnInit {

  constructor(private log: CheckloginService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    if (await this.log.checkAlive() == false){
      this.router.navigate(["/cringe"]);
    };

    if ( await this.log.checkLogin() === false){
      this.router.navigate(["/login"]);
    };
   
  }

}
