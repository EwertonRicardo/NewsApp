import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { StorageService } from '../../services/storage.service';
import { LoadingService } from '../../services/loading.service';
import { AlertService, AlertColors } from '../../services/alert.service';
import { UserModel } from '../../models/user.model';
import { AlertsMessageEnum } from '../../enums/alerts-message.enum';
import { NewsPage } from '../../pages/news/news';


@IonicPage()
@Component({
  selector: 'page-signup-modal',
  templateUrl: 'signup-modal.html',
})
export class SignupModalPage {

  user: UserModel = new UserModel();
  confirmPassword: string;

  constructor(
    public navCtrl: NavController,
    private viewController: ViewController,
    private userProvider: UserProvider,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
  }

  async ionViewDidLoad() {
    await this.storageService.removeFilter();
    await this.storageService.removeToken();
   }

  public async register() {
    try {
      await this.loadingService.present(undefined, true);
      
      const token = await this.userProvider.signUp(this.user);
      if (token) {
        await this.storageService.setToken(token);
        return this.alertService.presentOk(AlertsMessageEnum.SuccessRegister, AlertColors.Success, null, this.nextPage.bind(this));
      }

      return this.alertService.presentOk(AlertsMessageEnum.GenericServiceError);

    } catch (error) {
      this.alertService.presentOk(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  public closeModal(): void {
    this.viewController.dismiss();
  }

  public nextPage(): void {
    this.navCtrl.push(NewsPage);
  }

}
