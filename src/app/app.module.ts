import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { InitialScreenPage } from '../pages/initial-screen/initial-screen';
import { SigninModalPage } from '../pages/signin-modal/signin-modal';
import { SignupModalPage } from '../pages/signup-modal/signup-modal';
import { NewsPage } from '../pages/news/news';
import { NewsDetailsModalPage } from '../pages/news-details-modal/news-details-modal';
import { FilterPage } from '../pages/filter/filter';
import { UserProvider } from '../providers/user/user';
import { NewsProvider } from '../providers/news/news';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from '../services/storage.service';
import { LoadingService } from '../services/loading.service';
import { AlertService } from '../services/alert.service';
import { ToastService } from '../services/toast.service';

@NgModule({
  declarations: [
    MyApp,
    InitialScreenPage,
    SigninModalPage,
    SignupModalPage,
    NewsPage,
    NewsDetailsModalPage,
    FilterPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InitialScreenPage,
    SigninModalPage,
    SignupModalPage,
    NewsPage,
    NewsDetailsModalPage,
    FilterPage,   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    NewsProvider,
    StorageService,
    LoadingService,
    AlertService,
    ToastService
  ]
})
export class AppModule { }
