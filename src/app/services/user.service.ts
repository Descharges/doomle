import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data : any

  constructor(private http: HttpClient, private router : Router) {

    this.http.get("/api/user", {
      observe: "body",
      withCredentials: true,
      responseType: "json"
    }).subscribe( (res:any) => {
      if(res.success == false){
        this.router.navigateByUrl("/login")
      }else{
        this.data = res.data
      }
    }, err =>{
      this.router.navigateByUrl("/cringe")
    })
  }

  update(){
    this.http.get("/api/user", {
      observe: "body",
      withCredentials: true,
      responseType: "json"
    }).subscribe( (res:any) => {
      if(res.success == false){
        this.router.navigateByUrl("/login")
      }else{
        this.data = res.data
      }
    }, err =>{
      this.router.navigateByUrl("/cringe")
    })
  }

  async logout(){
    await this.http.get("/api/logout",{
      withCredentials: true
    })

    this.router.navigateByUrl("/login")
  }

}
