import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SettingsQuery } from '@core/store/settings/settings.query';
import { Movie } from '@models';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';

@Component({
    selector: 'app-movie-list-item',
    templateUrl: './movie-list-item.component.html',
    styleUrls: ['./movie-list-item.component.scss'],
})
export class MovieListItemComponent extends ComponentAbstract implements OnInit, OnChanges {

    @Input()
    public movie: Movie;

    public poster: string;
    public posterSize: number = 250;
    public isPosterLoaded: boolean = false;
    public isVisible: boolean = false;

    constructor(
        public injector: Injector,
        private settingsQuery: SettingsQuery
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.movie && changes.movie.currentValue) {
            if (this.movie.details) {
                this.poster = this.movie.details.posterPath;
            } else {
                this.poster = 'assets/images/fallback-image.png';
            }
        }
    }

    ionImgDidLoad(): void {
        this.isPosterLoaded = true;
    }

    show(isVisible: boolean) {
        this.isVisible = isVisible;
    }
}
