import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { Ressource } from 'src/objectClass/Ressource';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  
 

  constructor() { }//Déclaré comme une attribut classique, mais on a pas besoin de l'initaliser dans le constructeur


// TODO 
  getRessources(): Observable<Ressource[]>{
    return new Observable;
  }

  addRessources(task:Task):Observable<Task>{
    return new Observable;
  }

  deleteRessources(task:Task):Observable<Task>{
    return new Observable;
  }



}
