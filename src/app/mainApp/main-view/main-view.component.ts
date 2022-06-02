import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @Input() classId: Number;
  @Input() resId: Number;
  text: String;
  url : SafeUrl;

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("");
    if (this.resId == undefined) {
      this.text = "Veuillez sélectionner un cours"
    } else {
      this.text = "Affichage du component n°" + this.resId;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:4200/api/res/" + this.resId);
      console.log(this.url);
      
    }
  }

}
