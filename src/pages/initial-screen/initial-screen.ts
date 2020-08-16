import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController} from 'ionic-angular';
import { SigninModalPage } from '../../pages/signin-modal/signin-modal';
import { SignupModalPage } from '../../pages/signup-modal/signup-modal';

@IonicPage()
@Component({
  selector: 'page-initial-screen',
  templateUrl: 'initial-screen.html',
})
export class InitialScreenPage {

  constructor(
    public navCtrl: NavController,
    public modalController: ModalController
    ) {
  }

  ionViewDidLoad() { }

  public signinPage(): void {
    const modal = this.modalController.create(SigninModalPage);
    modal.present();
  }

  public signupPage(): void {
    const modal = this.modalController.create(SignupModalPage);
    modal.present();
  }
  
}


