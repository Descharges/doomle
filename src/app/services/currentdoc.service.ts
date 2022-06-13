import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentdocService {

  observable : Observable<any>

  constructor(private http: HttpClient, private route: ActivatedRoute) { 

    this.observable = new Observable(sub => {
      route.queryParams.subscribe( async params => {

        if (params['res'] == null) {
          sub.next({
            success: false,
            message: "no ressource selected"
          })
        } else {
          sub.next(await firstValueFrom(this.http.get("/api/resmeta/" + params['res'], {
            observe: "body",
            withCredentials: true,
            responseType: "json"
          })))
        }
      })
    })
  }
}
