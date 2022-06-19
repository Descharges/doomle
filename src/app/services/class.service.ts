import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  public observable: Observable<any>
  public users : any[];
  public id: number;
  private oldParam : any | null = null

  //public classSelected: Boolean = false;
  //public isSucess: Boolean = false;
  //public id: Number; 
  //public data: Observable<any> | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {

    this.observable = new Observable(sub => {
      route.queryParams.subscribe( async params => {

        if (params['class'] == null) {
          sub.next({
            success: false,
            message: "no class selected"
          })
        } else {
          this.id = params['class'];
          sub.next(await firstValueFrom(this.http.get("/api/class/" + params['class'], {
            observe: "body",
            withCredentials: true,
            responseType: "json"
          })))
          this.http.get("/api/class/"+this.id+"/users",{
            withCredentials: true,
            observe: 'body',
            responseType: 'json'
          }).subscribe((data : any) =>{
            this.users = data.data
          })
        }
      })
    })



  }

  async modifyClass(id:number, body:any){
    await firstValueFrom (this.http.patch(`/api/class/${id}`,body,{
      withCredentials: true,
      observe: 'body',
      responseType:'json'
    }))
  }

  addUser(name:string){
    return firstValueFrom(this.http.post(`/api/class/${this.id}/users/${name}`,{},{
      withCredentials: true,
      observe: 'body',
      responseType: 'json'
    }));
  }

  rmUser(id:number){
    return firstValueFrom(this.http.delete(`/api/class/${this.id}/users/${id}`,{
      withCredentials: true,
      observe: 'body',
      responseType: 'json'
    }));
  }

  async uploadFile(data:any){
    return firstValueFrom(this.http.post(`/api/res`,data,{
      withCredentials: true,
      observe: 'body',
      responseType: 'json'
    }));
  }

  rmRes(id:number){
    return firstValueFrom(this.http.delete(`/api/res/${id}`,{
      withCredentials: true,
      observe: 'body',
      responseType: 'json'
    }));
  }

      

  
}


