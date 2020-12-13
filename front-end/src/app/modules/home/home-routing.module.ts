import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* Component */
import { LoginComponent } from './login/login.component';
import { LoginWithTwoFaComponent } from './login-with-two-fa/login-with-two-fa.component';
import { SettingTwoFaComponent } from './setting-two-fa/setting-two-fa.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInPartTwoComponent } from './sign-in-part-two/sign-in-part-two.component';
import { ForgottenPassComponent } from './forgotten-pass/forgotten-pass.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-in-part-2',
        component: SignInPartTwoComponent
      },
      {
        path: 'sign-in-part-3-setting-2fa',
        component: SettingTwoFaComponent
      },
      {
        path: 'sign-in-part-4-pin-2fa',
        component: LoginWithTwoFaComponent
      },
      {
        path: 'forgotten-password',
        component: ForgottenPassComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
