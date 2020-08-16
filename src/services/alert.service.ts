import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AlertsMessageEnum } from '../enums/alerts-message.enum';

export enum AlertColors {
    Default = '',
    Success = 'btn-blue'
}

@Injectable()
export class AlertService {

    unauthorized: boolean = false;
    constructor(
        private alertCtrl: AlertController,
    ) { }

    presentOk(alertMessage: AlertsMessageEnum | string, color = AlertColors.Default, title = 'Atenção', callBack = () => { }, customCss?: string): void {
        const alert = this.alertCtrl.create({
            title: title,
            message: alertMessage,
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: callBack
                }
            ],
            cssClass: `custom-alert ok ${color} ${customCss}`
        });
        if (!this.unauthorized)
            alert.present();
    }

}