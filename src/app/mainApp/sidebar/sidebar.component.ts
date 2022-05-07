import { Component, OnInit } from '@angular/core';





export class Class {
  
    id:number = -1;
    name:string = "";
    definition:string = "";
    color:string = "";
    main_resource_id:number = -1;

  constructor(name?:string){
    if(name !== undefined)
      this.name = name;
  }

}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  toolbarOpened:boolean = false;


  //@test shoud be initialised with api instead
  classList:Class[] = [
    new Class("WE4A"),
    new Class("WE4B"),
    new Class("HM40")
  ]
    ;

  constructor() { 
    
  }

  ngOnInit(): void {
   
  }


}


