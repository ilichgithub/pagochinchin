import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
/* Components */
import { AppComponent } from './app.component';

/* Modules */
import { HomeModule } from './modules/home/home.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './modules/shared/loading/loading.component';


import { LoginServiceService } from './login-service.service';
import { HomeComponent } from './modules/main/home/home.component';
import { CoinComponent } from './modules/main/coin/coin.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HomeComponent,
    CoinComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    NgbModule,
    NgxPaginationModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  exports: [],
  providers: [
    LoginServiceService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-VE'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
