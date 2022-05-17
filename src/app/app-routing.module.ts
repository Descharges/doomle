import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./account/login/login.component";
import { SidebarComponent } from './mainApp/sidebar/sidebar.component';
import { ExplorerComponent } from './mainApp/explorer/explorer.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path:"", component: SidebarComponent},
  {path:"", component: ExplorerComponent, outlet: "cringe"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
