import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController } from 'ionic-angular';
import { SignupModalPage } from '../signup-modal/signup-modal';
import { NewsPage } from '../../pages/news/news';
import { UserProvider } from '../../providers/user/user.provider';
import { StorageService } from '../../services/storage.service';
import { LoadingService } from '../../services/loading.service';
import { UserModel } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { AlertsMessageEnum } from '../../enums/alerts-message.enum';
import { ErrorModel } from '../../models/error.model';
import { ValidatorsEnum } from '../../enums/validators.enum';

@IonicPage()
@Component({
  selector: 'page-signin-modal',
  templateUrl: 'signin-modal.html',
})
export class SigninModalPage {

  user: UserModel = new UserModel();
  errors: ErrorModel[];
  validators = ValidatorsEnum;

  constructor(
    public navCtrl: NavController,
    public viewController: ViewController,
    public modalController: ModalController,
    private userProvider: UserProvider,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) { }

  async ionViewDidLoad() {
    await this.storageService.removeFilter();
    await this.storageService.removeToken();
   }


  public async login() {
    
    try {
      await this.loadingService.present(undefined, true);
     
      const token = await this.userProvider.signIn(this.user);
      if (token) {
        await this.storageService.setToken(token);
        return this.nextPage();
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

  public signupPage(): void {
    const modal = this.modalController.create(SignupModalPage);
    modal.present();
  }

  public nextPage(): void {
    this.navCtrl.push(NewsPage);
  }

  public checkIsValid(): boolean {
    return this.user.email === '' || this.user.password === '';
  }
}
