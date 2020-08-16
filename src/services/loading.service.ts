import { Injectable } from "@angular/core";
import { LoadingController, Loading } from "ionic-angular";

export enum LoadingMessages {
    Default = 'Carregando dados...',
    ProcessingData = 'Processando dados...',
    LoggingOut = 'Deslogando da aplicação...',
}
@Injectable()
export class LoadingService {
    private loading: Loading;
    constructor(
        private loadingCtrl: LoadingController,
    ) {

    }

    present(message = LoadingMessages.Default, hideBackground?: boolean): Promise<void> {
        this.loading = this.loadingCtrl.create({
            content: message,
            cssClass: hideBackground ? 'loading-bkgr' : 'loading-default'
        });

        return this.loading.present();
    }

    dismiss(): void {
        this.loading.dismiss();
    }
}