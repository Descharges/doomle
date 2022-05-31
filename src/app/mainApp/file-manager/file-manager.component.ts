import { Component, OnInit } from '@angular/core';
import { Ressource } from 'src/objectClass/Ressource';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  constructor(private ressourceService: RessourceService) { }

  ressources:Ressource[];
  ngOnInit(): void {
    this.ressourceService.getRessources().subscribe((ressources)=>(this.ressources = ressources));
  }

  /*addTask(ressource:Ressource){
    this.ressourceService.addRessource(ressource).subscribe(
      (ressource) => (this.ressources.push(ressource)))//filter it out from the UI
  }*/

}
