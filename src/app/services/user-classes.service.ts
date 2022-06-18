import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserClassesService {


  public success: boolean;
  public classes : any[]
  private subscription : Subscription;

  constructor(private http: HttpClient) { 
    this.subscription = http.get("/api/classes",{
      observe: "body",
      withCredentials: true,
      responseType: "json"
    }).subscribe(data => {
      this.success = (data as any).success
      this.classes = (data as any).data
    })
  }

  update(){
    this.subscription.unsubscribe()
    this.subscription = this.http.get("/api/classes",{
      observe: "body",
      withCredentials: true,
      responseType: "json"
    }).subscribe(data => {
      this.success = (data as any).success
      this.classes = (data as any).data
    })
  }
}
