import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainViewComponent } from '../main-view/main-view.component';

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

  @Input() classColor : String;
  @Input() classId : Number;
  @Input() resId : Number;
  @Input() selectedClass:Class = new Class();
  @Input() explorerOpened:boolean = false;


  //@todo array of boolean depending on the number of submenues there is
  showSubmenu:boolean = true;
  color:String = "#ff7b00"
  textColor:String = "#232323"



  constructor() { }

  pickTextColorBasedOnBgColorSimple(bgColor:String, lightColor:String, darkColor:String) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      darkColor : lightColor;
  }
  

  ngOnInit(): void {

    console.log("classcolor:"+this.classColor)

    if(this.classColor != undefined){
      this.color = this.classColor;

    }
   
  }

  toggleSubmenu():void{
    console.log("coucou");
    console.log(this.showSubmenu);
    this.showSubmenu = !this.showSubmenu; 
    
}


}
