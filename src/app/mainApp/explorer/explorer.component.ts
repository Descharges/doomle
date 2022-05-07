import { Component, OnInit } from '@angular/core';


export class Ressource {
  
  name:string = "";
  id:number = -1;
  class_id:number = -1;
  path:string = "";
  file_id:number = -1;
  markdown_id:number = -1;
  test_id:number = -1;

  constructor(name?:string){
    if(name !== undefined)
      this.name = name;
  }

}


@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  ressourceList:Ressource[] = [
    new Ressource("Ch1"),
    new Ressource("Ch2"),
    new Ressource("Vidéo sympa")
  ]
    ;

  toolbarOpened:boolean = false;
  showSubmenu:boolean = false;

  constructor() { }

  ngOnInit(): void {
   
  }

  toggleSubmenu():void{
    console.log("coucou");
    console.log(this.showSubmenu);
    this.showSubmenu = !this.showSubmenu;
    

}

}
