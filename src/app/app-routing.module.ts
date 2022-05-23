import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './mainApp/sidebar/sidebar.component';
import { AuthappComponent } from './account/authapp.component';
import { MainappComponent } from './mainApp/mainapp.component';

const routes: Routes = [
  {path: "login", component: AuthappComponent},
  {path: "register", component: AuthappComponent},
  {path:"", component: MainappComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
