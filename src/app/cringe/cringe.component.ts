import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { CheckloginService } from '../services/checklogin.service';

@Component({
  selector: 'app-cringe',
  templateUrl: './cringe.component.html',
  styleUrls: ['./cringe.component.scss']
})
export class CringeComponent implements OnInit {

  constructor(private log: CheckloginService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    if (await this.log.checkAlive() == true){
      this.router.navigate(["/app"]);
    };

  }

}
