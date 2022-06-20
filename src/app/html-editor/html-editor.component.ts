import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";
import { UserService } from '../services/user.service';
import { ClassService } from '../services/class.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ressource } from 'src/objectClass/Ressource';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {

  html:string;
  className: string = ""
  clasColor: string = ""
  classId: number;

  ressourceName: string = "";

  sub: Subscription;

  section1 = {
    name : "",
    description: "",
    color: ""
  }

  section2 = {
    user : "",
    err : ""
  }

  section3 = [];

  ressource : Ressource = {
    id : -1,
    class : 0,
    path: "",
    type: ".html",
    filename: "",
    filedata: ""
  }


  constructor(
    public sanitizer: DomSanitizer,
    public user: UserService,
    public Dclass: ClassService,
    public router : Router,
) { }

  ngOnInit(): void {
    this.sub = this.Dclass.observable.subscribe(data=>{
      if (data.success==false){
        this.router.navigateByUrl("/dash")
      }else{
        this.className = data.data.name;
        this.clasColor = data.data.color;
        this.classId = data.data.id
        

        this.ressource.class = data.data.id

        this.section1.name = data.data.name;
        this.section1.description = data.data.description;
        this.section1.color = data.data.color;

        this.section3 = data.data.ressources;

      }
    })
    this.html = "<p>Bienvenue sur doomle !</p>"
    console.log("htmleditorcomponent - classId =" + this.classId)

    
  }

  leave(){
    this.router.navigateByUrl("/app?class="+this.classId)
  }

  update(){
    this.sub.unsubscribe()
    this.ngOnInit()
  }

  async addUser(){
    var data : any = await this.Dclass.addUser(this.section2.user)

    if(!data.success){
      this.section2.err = data.message
    }
    console.log((data as any));
    this.update()
  }

  async rmUser(id:number){
    var data : any = await this.Dclass.rmUser(id)

    if(!data.success){
      this.section2.err = data.message
    }
    console.log((data as any))
    this.update()
  }

  async uploadHTML(){
    this.ressource.path += "/" + this.ressourceName
    this.ressource.filedata = btoa(this.html)
    await this.Dclass.uploadFile(this.ressource)
    this.update()

    this.ressource = new Ressource();
    this.ressourceName = ""
    
  }

}
