import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './mainApp/sidebar/sidebar.component';
import { MainappComponent } from './mainApp/mainapp.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { CringeComponent } from './cringe/cringe.component';
import { ExplorerComponent } from './mainApp/explorer/explorer.component';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"auth", children:[
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent}
  ]},
  {path:"login", redirectTo:"auth/login"},
  {path:"register", redirectTo:"auth/register"},
  {path:"cringe", component:CringeComponent},
  {path:"app", component: MainappComponent},
  {path:"dash", component: DashboardComponent},
  {path:"editor", component: HtmlEditorComponent},
  {path : "class/:className", component: SidebarComponent},
  {path:'**', redirectTo:"app"},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
