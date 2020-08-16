import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsPage } from '../news/news';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  selectFavourite: boolean = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private storageService: StorageService 
  ) {
  }

  async ionViewDidLoad() {
    await this.loadFilter();
  }


  public async loadFilter(): Promise<void> {
    this.selectFavourite = await this.storageService.getFilter();
  }

  public async filter(): Promise<void> {
    await this.storageService.setFilter(this.selectFavourite);
    this.navCtrl.push(NewsPage);

  }
}
