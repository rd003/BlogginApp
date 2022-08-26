import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateCategory } from './components/Category/add-update-category.component';
import { DisplayCategoryComponent } from './components/Category/display-category.component';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { LoginComponent } from './components/Login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'add-category',component:AddUpdateCategory,canActivate:[AuthGuard]},
  {path:'update-category/:id',component:AddUpdateCategory,canActivate:[AuthGuard]},
  {path:'display-category',component:DisplayCategoryComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
