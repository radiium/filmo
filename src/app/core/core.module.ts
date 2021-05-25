import { NgModule } from '@angular/core';

// Store
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { MovieStore } from './store/movies/movie.store';
import { MovieQuery } from './store/movies/movie.query';
import { MovieService } from './store/movies/movie.service';
import { SettingsStore } from './store/settings/settings.store';
import { SettingsQuery } from './store/settings/settings.query';
import { SettingsService } from './store/settings/settings.service';

// Services
import { LoadingService } from './services/loading.service';
import { ElectronService } from './services/electron.service';
import { SystemService } from './services/system.service';
import { ScanService } from './services/scan.service';
import { IMDBService } from './services/imdb.service';

const SERVICES = [
    LoadingService,
    ElectronService,
    ScanService,
    SystemService,
    IMDBService,
    MovieStore,
    MovieQuery,
    MovieService,
    SettingsStore,
    SettingsQuery,
    SettingsService
];

@NgModule({
    imports: [
        AkitaNgDevtools.forRoot({})
    ],
    exports: [],
    declarations: [],
    providers: [
        ...SERVICES
    ]
})
export class CoreModule { }
