import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, CdkDrag} from '@angular/cdk/drag-drop';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Output } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Ressource } from 'src/objectClass/Ressource';
import { AddRessourceComponent } from '../add-ressource/add-ressource.component';


@Component({
  selector: 'app-file-manager-section',
  templateUrl: './file-manager-section.component.html',
  styleUrls: ['./file-manager-section.component.scss']
})
export class FileManagerSectionComponent implements OnInit {

  faTimes = faTimes;

  ressourceList:Ressource[] = [
    new Ressource("Pdf cool"),
    new Ressource("Vidéo sympa"),
    new Ressource("Pdf encore plus cool")
  ];


  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRessourceComponent, {
      width: '250px',
      data: {name:"Bebou"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });

  }
  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ressourceList, event.previousIndex, event.currentIndex);
  }

  onDeleteRessource(ressource:Ressource):void{
    
  }

}
