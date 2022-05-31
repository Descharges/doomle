import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CheckloginService } from '../../services/checklogin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('name') name: ElementRef;
  @ViewChild('fam_name') fam_name: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('pwd') pwd: ElementRef;
  @ViewChild('pwd_verif') pwd_verif: ElementRef;
  status: string;


  constructor(private log: CheckloginService) { }

  ngOnInit(): void {
  }

  async createAccount(): Promise<void> {

    const mailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (this.name.nativeElement.value == "" || this.fam_name.nativeElement.value == "" || this.mail.nativeElement.value == "" || this.pwd.nativeElement.value == "") {
      this.status = "nofill"
    } else if (!mailRegex.test(this.mail.nativeElement.value)){
      this.status = "mail"
    } else if (this.pwd.nativeElement.value != this.pwd_verif.nativeElement.value){
      this.status = "pwd"
    } else {
      this.status = (await this.log.createUser(
        this.name.nativeElement.value,
        this.fam_name.nativeElement.value,
        this.mail.nativeElement.value,
        this.pwd.nativeElement.value
      )).toString();
      this.status = "true"
      console.log(this.status)
    }


  }

}
