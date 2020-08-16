import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitialScreenPage } from './initial-screen';

@NgModule({
  declarations: [
    InitialScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(InitialScreenPage),
  ],
})
export class InitialScreenPageModule {}
