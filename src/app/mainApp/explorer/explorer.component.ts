import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainViewComponent } from '../main-view/main-view.component';

import { Class } from 'src/objectClass/Class';
import { Ressource } from 'src/objectClass/Ressource';
import { ClassService } from 'src/app/services/class.service';
import { Observable } from 'rxjs';
import { CurrentdocService } from 'src/app/services/currentdoc.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';






@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {


  @Input() classId: number;
  @Input() resId: Number;
  @Input() selectedClass: Class = new Class();
  @Input() explorerOpened: boolean = true;


  //@todo array of boolean depending on the number of submenues there is
  showSubmenu: boolean = true;
  classColor: String = "#ff7b00"
  textColor: String = "#232323"
  name: String = "Doomle"
  description: String = "Bienvenue sur Doomle ! Pour commencer, veuillez choisir un cours"
  files: any = []
  file: String = "Choissisez une ressource à afficher"
  oldDoc: number;
  oldClass: number;



  constructor(private dClass: ClassService, private cDoc: CurrentdocService, public user: UserService, public router: Router) { }

  ngOnInit(): void {

    this.dClass.observable.subscribe(data1 => {
      console.log(data1)
      console.log("test explorer component")
      if(+ this.user.data.name != null){
        console.log("explorer component user - name : null" )
      }
      
      if (data1.success == true && this.oldClass!=data1.data.id) {
        this.name = data1.data.name;
        this.classId = data1.data.id 
        this.description = data1.data.description;
        this.classColor = data1.data.color
        this.files = data1.data.ressources
        this.sortFiles(this.files);
        this.oldClass = data1.data.id

      } else if (data1.message != "no class selected" && (this.oldClass == null || this.oldClass!=data1.data.id)) {
        this.name = "Erreur !";
        this.description = "Le cours auquel vous essayer d'accéder ne vous est pas accessible ou n'existe pas";
        this.classColor = "#eb4949"
        this.files = []
      }
    })

    this.cDoc.observable.subscribe(data2 =>{
      console.log(data2)
      if(data2.success == true){
        this.oldDoc = data2.data.id
        this.file = data2.data.path.replaceAll("/", " > ")
      }
      //TODO: Implement a way to keep the last checked document in memory
    })



  }

  sortFiles(arr: any[]): number {

    var minId: number = Infinity

    arr.forEach((el: any) => {

      if (el.type == "folder") {
        el.id = this.sortFiles(el.content)
      }
      minId = Math.min(minId, el.id)
    });



    arr.sort((a, b) => { return a.id - b.id })

    return minId
  }


}
