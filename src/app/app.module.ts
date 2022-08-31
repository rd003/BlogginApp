import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/Login/login.component';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { TokenInterceptorService } from './services/token-interceptor';
import { AddUpdateCategory } from './components/Category/add-update-category.component';
import { DisplayCategoryComponent } from './components/Category/display-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,ChangePasswordComponent,DashboardComponent,AddUpdateCategory,
    DisplayCategoryComponent,
  ],
  imports: [
    BrowserModule,AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule, BrowserAnimationsModule
    ,MatCardModule,MatInputModule,MatButtonModule,MatSelectModule,MatTableModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, 
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
