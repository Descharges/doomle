import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Ressource } from 'src/objectClass/Ressource';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private apiUrl = 'http://localhost:4200/api';

  //TODO: Replace toPromise (deprecated) with firstValueFrom
  constructor(private http: HttpClient) { }

  getRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.apiUrl+"/ressource");
  }

  async getClasses(): Promise<any>{
    return await this.http.get(this.apiUrl + "/classes",{
      observe: "body",
      withCredentials : true,
      responseType : "json"
    }).toPromise();
  }

  private async loginReq(url:any, creds:any){
    return this.http.post(url + "/login", creds,{
      withCredentials : true,
      responseType : "text"
    }).toPromise();
  }

  async getClass(id:Number): Promise<any>{
    return await firstValueFrom(this.http.get(this.apiUrl + "/class/" + id,{
      observe: "body",
      withCredentials : true,
      responseType : "json"
    }))
  }

  async getFileMeta(id:Number): Promise<any>{
    return await this.http.get(this.apiUrl + "/resmeta/" + id,{
      observe: "body",
      withCredentials : true,
      responseType : "json"
    }).toPromise();
  }



  deleteRessource(ressource: Ressource): Observable<Ressource> {
    const url = `${this.apiUrl}/${ressource.id}`;
    return this.http.delete<Ressource>(url);
  }
  
  async addRessource(ressource:Ressource){
    this.http.post(this.apiUrl + "/res", ressource,{
      observe: "body",
      withCredentials: true,
      responseType: "json"
    }).toPromise().catch(err => {
      console.log("add ressource error" + err.status)
      return err.status;
    })
  

  }

}
