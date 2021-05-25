import { Component, Injector, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';
import { MovieImportComponent } from '@shared/components/movie-import/movie-import.component';
import { UiSettingsComponent } from '@shared/components/ui-settings/ui-settings.component';
import { MovieQuery } from '@core/store/movies/movie.query';
import { MovieService } from '@core/store/movies/movie.service';

@Component({
    selector: 'app-movie-header',
    templateUrl: './movie-header.component.html',
    styleUrls: ['./movie-header.component.scss'],
})
export class MovieHeaderComponent extends ComponentAbstract implements OnInit {

    public query: string = '';

    constructor(
        public injector: Injector,
        private movieQuery: MovieQuery,
        private movieService: MovieService,
        private modalController: ModalController,
        private popoverController: PopoverController
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.subs.query = this.movieQuery.query$.subscribe({
            next: (query: string) => {
                this.query = query;
            }
        });
    }

    public search(query: string): void {
        this.movieService.search(query);
    }

    public async openMovieImport(): Promise<void> {
        const popover = await this.modalController.create({
            component: MovieImportComponent,
            cssClass: 'custom-modal',
            mode: 'ios'
        });
        return await popover.present();
    }

    public async openUiSettings(ev: any): Promise<void> {
        const popover = await this.popoverController.create({
            component: UiSettingsComponent,
            cssClass: 'custom-popover',
            event: ev,
            translucent: true,
            mode: 'ios'
        });
        return await popover.present();
    }
}
