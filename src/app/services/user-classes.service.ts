import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserClassesService {


  public success: boolean;
  public classes : any[]

  constructor(private http: HttpClient) { 
    http.get("/api/classes",{
      observe: "body",
      withCredentials: true,
      responseType: "json"
    }).subscribe(data => {
      this.success = (data as any).success
      this.classes = (data as any).data
    })
  }
}
