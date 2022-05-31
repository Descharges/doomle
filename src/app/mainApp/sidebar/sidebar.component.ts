import { Component, OnInit } from '@angular/core';
import { Class } from 'src/objectClass/Class';
import { CheckloginService } from '../../services/checklogin.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  sidenavOpened:boolean = false;

  selectedClass:Class = new Class();


  //@test shoud be initialised with api instead
  classList:Class[] = [
    new Class("WE4A"),
    new Class("WE4B"),
    new Class("HM40"),
    new Class("AP4A")

  ]
    ;

  constructor(private router: Router) { 
    
  }

  ngOnInit(){}

  
  //Change the value of the selected class so that the explorer can use it  
  selectClass(selectedClass:Class):void{
    /*this.selectedClass.id = selectedClass.id;
    this.selectedClass.name = selectedClass.name;*/
    this.router.navigate(['/', 'class', selectedClass.name])
  }




}