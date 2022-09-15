import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateBlogComponent } from './components/Blog/add-update-blog.component';
import { DisplayBlogComponent } from './components/Blog/display-blog.component';
import { AddUpdateCategory } from './components/Category/add-update-category.component';
import { DisplayCategoryComponent } from './components/Category/display-category.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { LoginComponent } from './components/Login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'add-category',component:AddUpdateCategory,canActivate:[AuthGuard]},
  {path:'update-category/:id',component:AddUpdateCategory,canActivate:[AuthGuard]},
  {path:'display-category',component:DisplayCategoryComponent,canActivate:[AuthGuard]},
  {path:'change-password',component:ChangePasswordComponent,canActivate:[AuthGuard]},
  {path:'add-blog',component:AddUpdateBlogComponent,canActivate:[AuthGuard]},
  {path:'update-blog/:id',component:AddUpdateBlogComponent,canActivate:[AuthGuard]},
  {path:'display-blogs',component:DisplayBlogComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
