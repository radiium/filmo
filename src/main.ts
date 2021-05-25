import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableAkitaProdMode, persistState } from '@datorama/akita';

if (environment.production) {
    enableProdMode();
    enableAkitaProdMode();
}

// const storage = persistState();
// const providers = [{ provide: 'persistStorage', useValue: storage }];

platformBrowserDynamic(/*providers*/)
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
