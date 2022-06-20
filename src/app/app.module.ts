import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { MainViewComponent } from './mainApp/main-view/main-view.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './mainApp/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExplorerComponent } from './mainApp/explorer/explorer.component';
import { FileManagerComponent } from './mainApp/file-manager/file-manager.component';
import { FileManagerSectionComponent } from './mainApp/file-manager/file-manager-section/file-manager-section.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarComponent } from './mainApp/calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainappComponent } from './mainApp/mainapp.component';
import { RegisterComponent } from './account/register/register.component';
import { CringeComponent } from './cringe/cringe.component';
import { RecursiveListComponent } from './mainApp/explorer/recursive-list/recursive-list.component';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassService } from './services/class.service';
import { AddRessourceComponent } from './mainApp/file-manager/add-ressource/add-ressource.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainViewComponent,
    SidebarComponent,
    ExplorerComponent,
    FileManagerComponent,
    FileManagerSectionComponent,
    MainViewComponent,
    MainappComponent,
    RegisterComponent,
    CringeComponent,
    RecursiveListComponent,
    HtmlEditorComponent,
    DashboardComponent,
    AddRessourceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    DragDropModule,
    FontAwesomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    EditorModule,
    MatDialogModule
  ],
  providers: [{provide: MatDialogRef, useValue: {}},
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
