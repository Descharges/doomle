import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckloginService {

  constructor(private http: HttpClient) { }

  async req(url:any, creds:any){
    return this.http.post(url + "/login", creds,{
      withCredentials : true,
      responseType : "text"
    }).toPromise();
  }


  async checkLoginCreds(mail:string, pwd:string):Promise<boolean> {

    const url = "http://localhost:4200/api"

    const creds = {
      "username" : mail,
      "password" : pwd
    }

    const data = await this.req(url, creds);
    console.log(data);

    if(data=="Login succesfull"){
      return true;
    }else{
      return false;
    }

  
    


    

  }
}
