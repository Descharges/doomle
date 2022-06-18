import { Component, Input, OnInit } from '@angular/core';
import { Class } from 'src/objectClass/Class';
import { CheckloginService } from '../../services/checklogin.service';
import { Router } from '@angular/router';
import { RessourceService } from 'src/app/services/ressource.service';
import { UserClassesService } from 'src/app/services/user-classes.service';




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() classId: number;
  @Input() resId: Number;
  color: String;

  sidenavOpened: boolean = false;

  selectedClass: Class = new Class();

  data : any[] = [];


  //@test shoud be initialised with api instead

  
  constructor(public router: Router, private res: RessourceService, public classes: UserClassesService) {

  }

  async ngOnInit() {
    console.log(this.classes.classes)
  }

}