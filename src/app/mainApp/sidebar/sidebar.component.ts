import { Component, Input, OnInit } from '@angular/core';
import { Class } from 'src/objectClass/Class';
import { CheckloginService } from '../../services/checklogin.service';
import { Router } from '@angular/router';
import { RessourceService } from 'src/app/services/ressource.service';




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


  //@test shoud be initialised with api instead
  classList: Class[] = [
    new Class("WE4A"),
    new Class("WE4B"),
    new Class("HM40"),
    new Class("AP4A")

  ]
    ;

  constructor(private router: Router, private res: RessourceService,) {

  }

  async ngOnInit() {
    this.color = "#ff7b00"
    let classes = await this.res.getClasses();

    if (classes.success == true) {
      classes.data.forEach((el: { id: Number, color: String }) => {
        //console.log(this.classId)
        //console.log(el.id)
        if (el.id == this.classId) {
          //console.log("true");
          this.color = el.color
          return;
        }

      }
      );
    }
    //console.log(this.color);
  }


  //Change the value of the selected class so that the explorer can use it  
  selectClass(selectedClass: Class): void {
    /*this.selectedClass.id = selectedClass.id;
    this.selectedClass.name = selectedClass.name;*/
    this.router.navigate(['/', 'class', selectedClass.name])
  }




}