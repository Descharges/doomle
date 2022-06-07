import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
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
  text: String;
  stringUrl: string;
  url: SafeUrl;

  constructor(private sanitizer: DomSanitizer, private res: RessourceService, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("");
    if (this.resId == undefined) {
      this.type = "none"
      this.text = "Pour commencer, veuillez sélectionner un cours :)"
    } else {
      var data: any = await this.res.getFileMeta(this.resId);
      if (data.success == false) {
        this.type = "none"
        this.text = "Une erreur a eu lieu : \"" + data.message + "\" :(";
      } else {
        this.type = data.data.type
        this.stringUrl = "http://localhost:4200/api/res/" + this.resId
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.stringUrl);
      }

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
          break;

        default:
          this.type = "link"
          break;
      }


    }
  }

}
