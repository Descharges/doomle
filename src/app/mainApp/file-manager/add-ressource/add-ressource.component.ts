import { Component, Input, OnInit } from '@angular/core';
import { isThisWeek } from 'date-fns';
import { RessourceService } from 'src/app/services/ressource.service';
import { Class } from 'src/objectClass/Class';
import { Ressource } from 'src/objectClass/Ressource';
import { FormsModule } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.scss']
})
export class AddRessourceComponent implements OnInit {

  res: Ressource = new Ressource();


  @Input() color: string;
  @Input() classId: number;
  classes: Class[] = [
    new Class("SI40"),
    new Class("AP4A")
  ];


  
  filetypes: string[] = [
    "pdf",
    "txt",
    "html"
  ]
  constructor(private ressourceService : RessourceService, private classService : ClassService) { }

  ngOnInit(): void {

    this.classService.observable.subscribe(data1 => {
      console.log(data1)
      console.log("test explorer component")
    })

  }

  //Convert to base 64
  onFileSelected(event?: Event) {
    const file = (event!.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.res.filedata = btoa((reader.result as string));
    };

  this.res.type = "." +  file.name.split(".",2)[1]

  }


  async addRessource(){

    console.log("addressource - res = " +  this.res)
    this.res.path += "/" + this.res.filename
    this.res.class = this.classId;
   
    this.ressourceService.addRessource(this.res)
    
    //Empty fields
    this.res = new Ressource();

  }

  

}
