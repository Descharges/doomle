import { Component, OnInit } from '@angular/core';
import { isThisWeek } from 'date-fns';
import { RessourceService } from 'src/app/services/ressource.service';
import { Class } from 'src/objectClass/Class';
import { Ressource } from 'src/objectClass/Ressource';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.scss']
})
export class AddRessourceComponent implements OnInit {

  res: Ressource = new Ressource();

  classes: Class[] = [
    new Class("SI40"),
    new Class("AP4A")
  ];

  filetypes: string[] = [
    "aucun",
    ".pdf",
    ".txt",
    ".html",
    "URL"
  ]
  constructor(private ressourceService : RessourceService) { }

  ngOnInit(): void {
  }

  //Convert to base 64
  onFileSelected(event?: Event) {
    const file = (event!.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.res.filedata = (reader.result as string);
    };
  }

  async addRessource(){
    console.log(this.res)
    this.ressourceService.addRessource(this.res)

  }

}
