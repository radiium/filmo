import { Component, Injector } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';
import { LoadingService } from '@core/services/loading.service';
import { MovieService } from '@core/store/movies/movie.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent extends ComponentAbstract {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public injector: Injector,
        public loading: LoadingService,
        public movieService: MovieService
    ) {
        super(injector);
        this.initializeApp();
    }

    async initializeApp() {
        this.loading.show().then(() => {
            this.platform.ready().then(async () => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
                this.loading.hide();
            });
        });
    }
}
