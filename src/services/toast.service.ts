import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

  showButton: boolean;

  constructor(
    private toastCtrl: ToastController
  ) { }

  toast(duration: number, message: string, button: string, css: string, callback?: any) {

    let elapsedTime: number = 0;
    let intervalHandler = setInterval(() => { elapsedTime += 10; }, 10);
    this.showButton = button !== 'false'

    let toast = this.toastCtrl.create({
      position: "bottom",
      duration: duration,
      message: message,
      showCloseButton: this.showButton,
      closeButtonText: button,
      cssClass: css
    });
    toast.onDidDismiss(() => {
      clearInterval(intervalHandler);
      if (elapsedTime < duration) {
        if (callback != null) callback()
      }
    });
    toast.present();
  }
}