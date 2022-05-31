import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckloginService {

  constructor(private http: HttpClient) { }

  private async loginReq(url: any, creds: any) {
    return this.http.post(url + "/login", creds, {
      withCredentials: true,
      responseType: "text"
    }).toPromise();
  }

  private async verifLoginReq(url: any) {
    return this.http.get(url + "/login", {
      withCredentials: true,
      responseType: "text"
    }).toPromise();
  }


  async checkAlive() {

    const data = await this.http.get(
      'http://localhost:4200/api/',
      { observe: 'response' }
    ).toPromise().catch(err => {
      return err.status;
    })

    if (data == 504) {
      return false;
    } else {
      return true;
    }


  }

  async checkLogin(): Promise<boolean> {
    const data = await this.verifLoginReq("http://localhost:4200/api");
    console.log(data);
    if (data == "Ok") {
      return true;
    } else {
      return false;
    }
  }

  async createUser(name: string, fam_name: string, mail: string, pwd: string): Promise<boolean> {
    const url = "http://localhost:4200/api/newuser"

    const body = {
      "name": name,
      "fam_name": fam_name,
      "mail": mail,
      "password": pwd
    }

    let out: string;

    const data = await this.http.post(url, body, {
      withCredentials: true,
      observe: 'body',
      responseType: 'text'
    }).toPromise().catch(err => {
      return err.status;
    })

    console.log(data);

    if (data == "ok") {
      return true;
    } else {
      return false;
    }
  }

  async checkLoginCreds(mail: string, pwd: string): Promise<boolean> {

    const url = "http://localhost:4200/api"

    const creds = {
      "username": mail,
      "password": pwd
    }

    const data = await this.loginReq(url, creds);
    console.log(data);

    if (data == "Login succesfull") {
      return true;
    } else {
      return false;
    }







  }
}
