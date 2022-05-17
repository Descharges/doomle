import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./account/login/login.component";
import {MainViewComponent} from "./mainApp/main-view/main-view.component"

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path:"", component: MainViewComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
