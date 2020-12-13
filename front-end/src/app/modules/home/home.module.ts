import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
/* Routing */
import { HomeRoutingModule } from './home-routing.module';
/* Component */
import { ForgottenPassComponent } from './forgotten-pass/forgotten-pass.component';
import { LoginComponent } from './login/login.component';
import { LoginWithTwoFaComponent } from './login-with-two-fa/login-with-two-fa.component';
import { SettingTwoFaComponent } from './setting-two-fa/setting-two-fa.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInPartTwoComponent } from './sign-in-part-two/sign-in-part-two.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
  ],
  declarations: [
    LoginComponent,
    SignInComponent,
    ForgottenPassComponent,
    LoginWithTwoFaComponent,
    SignInPartTwoComponent,
    SettingTwoFaComponent,
  ]
})
export class HomeModule { }
