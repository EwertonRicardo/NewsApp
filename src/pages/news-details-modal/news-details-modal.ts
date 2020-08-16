import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { HighlightsModel } from '../../models/highlights.model';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-news-details-modal',
  templateUrl: 'news-details-modal.html',
})
export class NewsDetailsModalPage {
  newsDetails: HighlightsModel = new HighlightsModel();
  savedNews: HighlightsModel[] = [];

  constructor(
    public navCtrl: NavController,
    public viewController: ViewController,
    public navParams: NavParams,
    private storageService: StorageService
  ) {
    this.getDetails();
  }

  async ionViewDidLoad() {
    this.savedNews = await this.storageService.getNews();
  }

  public async markFavourite(): Promise<void> {

    this.newsDetails.favourite = !this.newsDetails.favourite;
    let getIndex: number;
    if (this.savedNews && this.savedNews.length > 0) {

      const check = !!this.savedNews.find((n, index) => {
        getIndex = index;
        return n.title.toLowerCase().includes(this.newsDetails.title.toLowerCase());
      });
      if (!check) {
        this.savedNews.push(this.newsDetails);
        this.storageService.setNews(this.savedNews);
      } else {
        this.savedNews.splice(getIndex, 1);
        if (this.savedNews.length == 0) {
          await this.storageService.removeNews();
        } else {
          this.storageService.setNews(this.savedNews);
        }
      }
    } else {
      this.savedNews.push(this.newsDetails);
      this.storageService.setNews(this.savedNews);
    }
  }

  public closeModal(): void {
    this.viewController.dismiss();
  }

  public shareNews(): void {
    console.log('shared');
  }

  public getDetails(): void {
    const details = this.navParams.get('newsDetails');
    if (details) {
      this.newsDetails = details;
    }
  }
}
