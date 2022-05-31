import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Ressource } from 'src/objectClass/Ressource';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private apiUrl = 'http://localhost:4200/api';


  constructor(private http: HttpClient) { }

  getRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(this.apiUrl+"/ressource");
  }

  private async loginReq(url:any, creds:any){
    return this.http.post(url + "/login", creds,{
      withCredentials : true,
      responseType : "text"
    }).toPromise();
  }

  deleteRessource(ressource: Ressource): Observable<Ressource> {
    const url = `${this.apiUrl}/${ressource.id}`;
    return this.http.delete<Ressource>(url);
  }
  /*
    addRessource(ressource:Ressource):Observable<Ressource>{
      return this.http.post<Ressource>(this.apiUrl, ressource, httpOptions);
    }*/

}
