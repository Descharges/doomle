import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainViewComponent } from '../main-view/main-view.component';

import { Class } from 'src/objectClass/Class';
import { Ressource } from 'src/objectClass/Ressource';
import { ClassService } from 'src/app/services/class.service';
import { Observable } from 'rxjs';
import { CurrentdocService } from 'src/app/services/currentdoc.service';






@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {


  @Input() classId: number;
  @Input() resId: Number;
  @Input() selectedClass: Class = new Class();
  @Input() explorerOpened: boolean = false;


  //@todo array of boolean depending on the number of submenues there is
  showSubmenu: boolean = true;
  classColor: String = "#ff7b00"
  textColor: String = "#232323"
  name: String = "Doomle"
  description: String = "Bienvenue sur Doomle ! Pour commencer, veuillez choisir un cours"
  files: any = []
  file: String = "Choissisez une ressource à afficher"

  Le_boule_des_filles_selon_tachikart : Observable<any>



  constructor(private dClass: ClassService, private cDoc: CurrentdocService) { }

  ngOnInit(): void {




    this.dClass.observable.subscribe(data1 => {
      console.log(data1)
      if (data1.success == true) {
        this.name = data1.data.name;
        this.description = data1.data.description;
        this.classColor = data1.data.color
        this.files = data1.data.ressources
        this.sortFiles(this.files);

      } else if (data1.message != "no class selected") {
        this.name = "Erreur !";
        this.description = "Le cours auxquelle vous essayer d'accéder ne vous est pas accessible ou n'existe pas";
        this.classColor = "#eb4949"
        this.files = []
      }
    })

    this.cDoc.observable.subscribe(data2 =>{
      console.log(data2)
      if(data2.success == true){
        this.file = data2.data.path.replaceAll("/", " > ")
      }
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
