import { Component, EventEmitter, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, CdkDrag} from '@angular/cdk/drag-drop';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Output } from '@angular/core';

import { Ressource } from 'src/objectClass/Ressource';


@Component({
  selector: 'app-file-manager-section',
  templateUrl: './file-manager-section.component.html',
  styleUrls: ['./file-manager-section.component.scss']
})
export class FileManagerSectionComponent implements OnInit {

  faTimes = faTimes;

  @Output() onDeleteSection:EventEmitter<Task> = new EventEmitter();
  ressourceList:Ressource[] = [
    new Ressource("Pdf cool"),
    new Ressource("Vidéo sympa"),
    new Ressource("Pdf encore plus cool")
  ];


  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ressourceList, event.previousIndex, event.currentIndex);
  }

  onDeleteRessource(ressource:Ressource):void{
    
      // TODO implement function with the following code example 
      /*Code example :
      this.taskService.deleteTask(task).subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))//filter it out from the UI*/
      
    
  }

  
}
