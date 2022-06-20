import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ɵassignExtraOptionsToRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CurrentdocService } from 'src/app/services/currentdoc.service';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @Input() classId: Number;
  @Input() resId: Number;
  type: String;
  text: string;
  stringUrl: string;
  url: SafeUrl;
  safeHtml: SafeHtml

  constructor(private sanitizer: DomSanitizer, private cDoc: CurrentdocService, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {

    this.type = "none"
    this.text = "Pour commencer, veuillez sélectionner un cours :)"

    this.cDoc.observable.subscribe(async data => {

      if (data.success == false) {
        this.type = "none"
        this.text = "Une erreur a eu lieu : \"" + data.message + "\" :(";
      } else {
        this.type = data.data.type
        this.stringUrl = "http://localhost:4200/api/res/" + data.data.id
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.stringUrl);

        switch (this.type) {
          case ".pdf":
            break;

          case "none":
            break;

          case ".txt":

            this.text = await firstValueFrom(this.http.get(this.stringUrl, { responseType: 'text' }))
            console.log(this.text)
            break;

          case ".html":

            this.text = await firstValueFrom(this.http.get(this.stringUrl, { responseType: 'text' }))
            console.log(this.text)
            this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.text)
            break;

          default:
            this.type = "link"
            break;
        }

      }

    })



  }
}
