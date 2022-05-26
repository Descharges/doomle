import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './mainApp/sidebar/sidebar.component';
import { MainappComponent } from './mainApp/mainapp.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

const routes: Routes = [
  {path:"auth", children:[
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent}
  ]},
  {path:"login", redirectTo:"auth/login"},
  {path:"register", redirectTo:"auth/register"},
  {path:"", component: MainappComponent},
  {path:'**', redirectTo:""},

  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
