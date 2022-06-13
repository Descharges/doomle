import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {

  html:string;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.html = "<p>Bienvenue sur doomle !</p>"
  }

  test(){
    console.log(this.html);
  }

}
