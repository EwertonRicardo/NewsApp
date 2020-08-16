import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { NewsDetailsModalPage } from '../news-details-modal/news-details-modal';
import { FilterPage } from '../filter/filter';
import { NewsModel } from '../../models/news.model';
import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { NewsProvider } from '../../providers/news/news';
import { HighlightsModel } from '../../models/highlights.model';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news: NewsModel = new NewsModel();
  highlights: HighlightsModel[] = [];
  savedNews: HighlightsModel[] = [];
  filter: boolean = false;

  constructor(
    public navCtrl: NavController,
    public modalController: ModalController,
    public navParams: NavParams,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private newsProvider: NewsProvider,
    private storageService: StorageService,
  ) {

  }

  async ionViewDidLoad() {

    await this.loadData();
    await this.showFavouritedNews();

  }


  public async loadData(): Promise<void> {
    try {
      await this.loadingService.present(undefined, true);

      const allNews = await this.newsProvider.fetchNews();
      const hightLights = await this.newsProvider.fetchHighLights();

      if (allNews && allNews.data.length > 0) {
        this.news = allNews;
        this.setHighLights();
      }

      if (hightLights && hightLights.length > 0)
        this.highlights = hightLights;

    } catch (error) {
      this.alertService.presentOk(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public openNewsDetail(news: HighlightsModel): void {
    const modal = this.modalController.create(NewsDetailsModalPage, { newsDetails: news });
    modal.present();
  }

  public navigateToFilterPage(): void {
    this.navCtrl.push(FilterPage);
  }


  public setHighLights(): void {
    if (this.news.data && this.news.data.length > 0) {
      this.news.data.forEach((n) => {
        if (n.highlight) {
          this.highlights.push(new HighlightsModel(n));
        }
      });
    }
  }

  public async markFavourite(news: HighlightsModel): Promise<void> {
    this.savedNews = await this.storageService.getNews();
    news.favourite = !news.favourite;

    let getIndex: number;
    if (this.savedNews && this.savedNews.length > 0) {

      const check = !!this.savedNews.find((n, index) => {
        getIndex = index;
        return n.title.toLowerCase().includes(news.title.toLowerCase());
      });
      if (!check) {
        this.savedNews.push(news);
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
      this.savedNews.push(news);
      this.storageService.setNews(this.savedNews);
    }
  }

  public async showFavouritedNews(): Promise<void> {
    this.savedNews = await this.storageService.getNews();

    this.news.data.forEach(n => {
      this.highlights.forEach(h => {
        this.savedNews.forEach(s => {

          if (n.title.toLowerCase().includes(s.title.toLowerCase())) {
            n.favourite = s.favourite;
          }

          if (h.title.toLowerCase().includes(s.title.toLowerCase())) {
            h.favourite = s.favourite;
          }
        });
      });
    });
    this.filter = await this.storageService.getFilter();
    if (this.filter) {
      this.news.data = this.news.data.filter(n => n.favourite == this.filter);
      this.highlights = this.highlights.filter(h => h.favourite == this.filter);
    }
  }

}
