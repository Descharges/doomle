import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  public observable: Observable<any>
  private oldParam : any | null = null

  //public classSelected: Boolean = false;
  //public isSucess: Boolean = false;
  //public id: Number; 
  //public data: Observable<any> | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {

    this.observable = new Observable(sub => {
      console.log("AAAAAAAAAAAAAAAAAA")
      route.queryParams.subscribe( async params => {

        if (params['class'] == null) {
          sub.next({
            success: false,
            message: "no class selected"
          })
        } else {
          sub.next(await firstValueFrom(this.http.get("/api/class/" + params['class'], {
            observe: "body",
            withCredentials: true,
            responseType: "json"
          })))
        }
      })
    })

  }
      

  
}


