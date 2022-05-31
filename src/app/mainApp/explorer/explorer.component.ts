import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Class } from 'src/objectClass/Class';
import { Ressource } from 'src/objectClass/Ressource';






@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  ressourceList:Ressource[] = [
    new Ressource("pdf1"),
    new Ressource("pdf2"),
    new Ressource("vidéo1")
  ]
    ;

  @Input() selectedClass:Class = new Class();
  @Input() explorerOpened:boolean = false;


  //@todo array of boolean depending on the number of submenues there is
  showSubmenu:boolean = true;



  constructor() { }

  ngOnInit(): void {
   
  }

  toggleSubmenu():void{
    console.log("coucou");
    console.log(this.showSubmenu);
    this.showSubmenu = !this.showSubmenu; 
    
}


}
