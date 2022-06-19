import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-recursive-list',
  templateUrl: './recursive-list.component.html',
  styleUrls: ['./recursive-list.component.scss']
})
export class RecursiveListComponent implements OnInit {

  @Input() folder: any;
  @Input() classId: number;
  @Input() color: String;
  @Input() edit: boolean = false;
  first: boolean;

  sub : Subscription;
  constructor(public router: Router, public dClass: ClassService) { }

  ngOnInit(): void {

    this.sub = this.dClass.observable.subscribe( data => {
      if(this.folder == undefined){
        this.first = true
        this.folder = data.data.ressources
      }
    })
  }

  navigate(el:any){
    if(this.edit == false){
      this.router.navigateByUrl('/app?class='+this.classId+'&res='+el.id)
    }
  }

  rmRes(id: number){
    if (confirm("Êtes vous sûr ? Cette action est dévinitive")){
      this.dClass.rmRes(id);
      document.location.reload()
    }
  }

}
