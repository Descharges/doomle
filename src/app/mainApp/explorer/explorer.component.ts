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
    new Ressource("Ch1"),
    new Ressource("Ch2"),
    new Ressource("Vidéo sympa")
  ]
    ;

  @Input() selectedClass:Class = new Class();

  @Input() explorerOpened:boolean = false;
  @Output() explorerOpenedChange = new EventEmitter<boolean>();

  //@todo array of boolean depending on the number of submenues there is
  showSubmenu:boolean = false;



  constructor() { }

  ngOnInit(): void {
   
  }

  toggleSubmenu():void{
    console.log("coucou");
    console.log(this.showSubmenu);
    this.showSubmenu = !this.showSubmenu; 
    
}


  toggleExplorer():boolean{
    this.explorerOpened = !this.explorerOpened;
    this.explorerOpenedChange.emit(this.explorerOpened);
    console.log(this.explorerOpened);
    return this.explorerOpened;
  }
}
