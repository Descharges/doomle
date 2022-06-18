import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserClassesService } from '../services/user-classes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  search: string;
  results: any[] = [];

  constructor(private http: HttpClient, public router: Router, public classes: UserClassesService) { }

  ngOnInit(): void {
  }

  async onChange(n: string) {
    if (n != "") {
      var data = await firstValueFrom(this.http.get("/api/searchres/" + n, {
        observe: 'body',
        withCredentials: true,
        responseType: 'json'
      }))

      this.results = (data as any).data
    }

  }


  navigate(id: number, res: number) {
    this.router.navigateByUrl(`/app?class=${id}&res=${res}`)
  }

}