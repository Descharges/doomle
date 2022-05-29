import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CheckloginService } from '../../services/checklogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('mail') mail:ElementRef;
  @ViewChild('pwd') pwd:ElementRef;
  login: string;
 

  constructor(private log: CheckloginService, private router: Router) {
    this.login = "no"
  }

  async ngOnInit(): Promise<void> {
    if (await this.log.checkAlive() == false){
      this.router.navigate(["/cringe"]);
    };
    
  }

  

  async checkLogin(): Promise<void> {
    const login = await this.log.checkLoginCreds(this.mail.nativeElement.value,this.pwd.nativeElement.value);
    console.log("login value :" + login);
    if(login){
      this.login = "succ"
      this.router.navigate([""]);
      
    }else{
      this.login = "fail"
    }
  }
}
