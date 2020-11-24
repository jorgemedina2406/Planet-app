import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { VerifyTokenGuard } from './services/guards/verify-token.guard';
import { LoginGuardGuard } from './services/guards/login-guards.guard';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

import { FCM } from '@ionic-native/fcm/ngx';
import { PipesModule } from './pipes/pipes.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginGuardGuard,
    VerifyTokenGuard,
    FCM,
    NativePageTransitions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
