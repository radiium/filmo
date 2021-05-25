import { Component, Injector, Input, OnInit } from '@angular/core';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';
import { SystemService } from '@core/services/system.service';
import { MovieQuery } from '@core/store/movies/movie.query';
import { MovieService } from '@core/store/movies/movie.service';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-movie-import',
    templateUrl: './movie-import.component.html',
    styleUrls: ['./movie-import.component.scss'],
})
export class MovieImportComponent extends ComponentAbstract implements OnInit {

    public allLocations: string[] = [];
    public dragover: boolean = false;
    public dismiss: boolean = false;

    constructor(
        public injector: Injector,
        private movieQuery: MovieQuery,
        private movieService: MovieService,
        private systemService: SystemService,
        private modalController: ModalController,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.subs.location = this.movieQuery.locations$.subscribe({
            next: (value: string[]) => {
                this.allLocations = value;
            }
        });
    }

    public onDropFolder(items: any[]): void {
        const locations = items.map((item: any) => item.path);
        this.movieService.addLocation(locations);
    }

    public openFolder(): void {
        const locations = this.systemService.showOpenDialog();
        if (locations && locations.length > 0) {
            this.movieService.addLocation(locations);
        }
    }

    public closeModal(): void {
        this.modalController.dismiss();
    }

    public deleteLocation(value: string): void {
        this.movieService.removeLocation(value);
    }
}
