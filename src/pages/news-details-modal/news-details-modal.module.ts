import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDetailsModalPage } from './news-details-modal';

@NgModule({
  declarations: [
    NewsDetailsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsDetailsModalPage),
  ],
})
export class NewsDetailsModalPageModule {}
