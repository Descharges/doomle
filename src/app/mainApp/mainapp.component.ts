import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CheckloginService } from '../services/checklogin.service';
import { RessourceService } from '../services/ressource.service';

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
    private route: ActivatedRoute,
    private res: RessourceService,
  ) { }

  async ngOnInit(): Promise<void> {

    


    this.route.queryParams.subscribe(params => {
      this.classId = params['class'];
      this.resId = params['res'];
    });    

    if (await this.log.checkAlive() == false) {
      this.router.navigate(["/cringe"]);
    };

    if (await this.log.checkLogin() === false) {
      this.router.navigate(["/login"]);
    };

    let classes = await this.res.getClasses();

  }

}
