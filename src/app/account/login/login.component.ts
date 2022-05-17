import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CheckloginService } from '../../checklogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('mail') mail:ElementRef;
  @ViewChild('pwd') pwd:ElementRef;
  login: string;
 

  constructor(private log: CheckloginService) {
    this.login = "no"
  }

  ngOnInit(): void {
  }

  async checkLogin(): Promise<void> {
    const login = await this.log.checkLoginCreds(this.mail.nativeElement.value,this.pwd.nativeElement.value);
    console.log("login value :" + login);
    if(login){
      this.login = "succ"
    }else{
      this.login = "fail"
    }
  }
}
