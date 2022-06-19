import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {

  html:string;

  constructor(
    public sanitizer: DomSanitizer,
    public user: UserService,
    public Dclass: ClassService,
) { }

  ngOnInit(): void {
    this.html = "<p>Bienvenue sur doomle !</p>"
  }

  test(){
    console.log(this.html);
  }

}
