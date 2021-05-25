import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
    isLoading = false;
    private loading: HTMLIonLoadingElement;

    constructor(
        public loadingController: LoadingController) {
    }

    public async show(message: string = 'Chargement...'): Promise<void> {
        // // await this.hide();
        // this.loading = await this.loadingController.create({
        //     message,
        //     cssClass: 'custom-loading',
        //     keyboardClose: false,
        //     mode: 'ios',
        //     translucent: true
        // });
        // await this.loading.present();

        const loading = await this.loadingController.create({
            message,
            cssClass: 'custom-loading',
            keyboardClose: false,
            mode: 'ios',
            translucent: true
        });
        return await loading.present()
    }

    public async hide(): Promise<void> {
        while (await this.loadingController.getTop()) {
            await this.loadingController.dismiss();
        }
        // if (this.loading) {
        //     await this.loadingController.dismiss();
        // }
    }
}
