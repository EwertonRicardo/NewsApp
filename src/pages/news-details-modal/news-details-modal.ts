import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, PopoverController } from 'ionic-angular';
import { HighlightsModel } from '../../models/highlights.model';
import { StorageService } from '../../services/storage.service';
import { PopoverComponent } from '../../components/popover/popover';
import { SocialSharing } from '@ionic-native/social-sharing';

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
    private storageService: StorageService,
    public popoverCtrl: PopoverController,
    private socialSharing: SocialSharing
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

  public getDetails(): void {
    const details = this.navParams.get('newsDetails');
    if (details) {
      this.newsDetails = details;
    }
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: event
    });

    popover.onDidDismiss((popoverData: Options) => {
      this.shareNews(popoverData.value);
    });
  }

  public shareNews(value): void {
    if (value == 1) {
      this.socialSharing.shareViaFacebook('Gostaria de compartilhar esse notícia', this.newsDetails.url)
        .then((e) => console.log('sucesso', e))
        .catch((err) => console.log('erro', err));
    }

    if (value == 2) {
      this.socialSharing.shareViaWhatsApp('Gostaria de compartilhar esse notícia!', this.newsDetails.url)
        .then((e) => console.log('sucesso', e))
        .catch((err) => console.log('erro', err));
    }

    if (value == 3) {
      this.socialSharing.shareViaSMS('Gostaria de compartilhar esse notícia', this.newsDetails.url)
        .then((e) => console.log('sucesso', e))
        .catch((err) => console.log('erro', err));
    }
  }
}

export interface Options {
  text: string,
  value: number
}