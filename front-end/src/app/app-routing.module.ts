import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

/* Guard Auth */
import { AuthGuard } from './core/helper/auth.guard';

import { HomeComponent } from './modules/main/home/home.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'main/home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home/login'
  }
];

@NgModule({
  imports: [ReactiveFormsModule,
            RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
