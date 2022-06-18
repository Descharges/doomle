import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserClassesService } from '../services/user-classes.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  search: string;
  results: any[] = [];


  showform: boolean = false;
  newClass: any = {
    name:"",
    description:"",
    color:""
  };

  constructor(
    private http: HttpClient,
    public router: Router,
    public classes: UserClassesService,
    public user: UserService){ }

  ngOnInit(): void {
    this.user.update()
    this.classes.update()
  }



  async onChange(n: string) {
    if (n != "") {
      var data = await firstValueFrom(this.http.get("/api/searchres/" + n, {
        observe: 'body',
        withCredentials: true,
        responseType: 'json'
      }))

      this.results = (data as any).data
    }

  }

  async addClass(){
    if(this.newClass.name!="" && this.newClass.description!="" && this.newClass.color!=""){
      var data = await firstValueFrom(this.http.post("/api/class",this.newClass,{
        observe: "body",
        withCredentials: true,
        responseType: "json"
      }))
      this.classes.update()
    }else{
      alert("Remplissez toutes les sections !")
    }

  }


  navigate(id: number, res: number) {
    this.router.navigateByUrl(`/app?class=${id}&res=${res}`)
  }

}