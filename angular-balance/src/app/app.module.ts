import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth.guard'
import * as path from 'path';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { StoreModule} from '@ngrx/store'
import { reducers } from './shared/store/reducers/index'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },

      {
        path: "logout",
        component: LogoutComponent
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ])
  ],
  providers: [AuthGuard, UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
