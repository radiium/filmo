import { Component, Injector, OnInit } from '@angular/core';
import { MovieFilter, MovieFilterType, MovieSorter, SidebarState, YearFilter } from '@models';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';
import { AnimationController, ModalController } from '@ionic/angular';
import { MovieQuery } from '@core/store/movies/movie.query';
import { MovieService } from '@core/store/movies/movie.service';
import { MovieImportComponent } from '../movie-import/movie-import.component';

@Component({
    selector: 'app-movie-sidebar',
    templateUrl: './movie-sidebar.component.html',
    styleUrls: ['./movie-sidebar.component.scss'],
})
export class MovieSidebarComponent extends ComponentAbstract implements OnInit {

    public sorters: MovieSorter;
    public filters: MovieFilter;
    public sidebar: SidebarState;

    public showStatus: boolean = true;
    public showLocations: boolean = true;
    public showGenres: boolean = true;
    public showYears: boolean = true;
    public movieFilterType: typeof MovieFilterType = MovieFilterType;

    constructor(
        public injector: Injector,
        private movieQuery: MovieQuery,
        private movieService: MovieService,
        private modalController: ModalController,
        private animationCtrl: AnimationController
    ) {
        super(injector);
    }

    ngOnInit() {
        this.subs.sorters = this.movieQuery.sorters$.subscribe({
            next: (value: MovieSorter) => {
                this.sorters = value;
            }
        });
        this.subs.filters = this.movieQuery.filters$.subscribe({
            next: (value: MovieFilter) => {
                this.filters = value;
            }
        });
        this.subs.sidebar = this.movieQuery.sidebar$.subscribe({
            next: (value: SidebarState) => {
                this.sidebar = value;

                if (this.sidebar.allLocations.length === 0) {
                    this.openMovieImport();
                }
            }
        });
    }

    // toggleSection(myElementRef, showStatus) {
    //     showStatus = !showStatus;
    //     let animation: Animation;
    //     console.log(myElementRef);
    //     if (showStatus) {
    //         animation = this.animationCtrl.create()
    //             .addElement(myElementRef.el)
    //             .duration(1000)
    //             .fromTo('height', '25px', 'auto');
    //     } else {
    //         animation = this.animationCtrl.create()
    //         .addElement(myElementRef.el)
    //         .duration(1000)
    //         .fromTo('height', 'auto', '25px');
    //     }
    //     animation.play();
    // }

    filterByType(filterType: MovieFilterType): void {
        this.movieService.setFiltersType(filterType);
    }

    filterByLocation(value: string): void {
        this.movieService.setFiltersLocation(value);
    }

    filterByGenre(value: string): void {
        this.movieService.setFiltersGenre(value);
    }

    filterByYear(value: YearFilter): void {
        this.movieService.setFiltersYears(value);
    }

    filterByRate(value: string): void {
        this.movieService.setFiltersRate(value);
    }

    public async openMovieImport(): Promise<void> {
        const modal = await this.modalController.create({
            component: MovieImportComponent,
            cssClass: 'custom-modal',
            mode: 'ios',
            backdropDismiss: false,
        });
        return await modal.present();
    }
}
