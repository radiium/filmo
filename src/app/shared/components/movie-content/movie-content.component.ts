import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { MovieQuery } from '@core/store/movies/movie.query';
import { SettingsQuery } from '@core/store/settings/settings.query';
import { DisplayType, Movie } from '@models';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';

@Component({
    selector: 'app-movie-content',
    templateUrl: './movie-content.component.html',
    styleUrls: ['./movie-content.component.scss'],
})
export class MovieContentComponent extends ComponentAbstract {

    public movies: Movie[] = [];
    public displayType: DisplayType = DisplayType.GRID;
    public displayTypeEnum: typeof DisplayType = DisplayType;

    @ViewChild('container')
    public container: ElementRef<HTMLDivElement>;

    constructor(
        public injector: Injector,
        private movieQuery: MovieQuery,
        private settingsQuery: SettingsQuery
    ) {
        super(injector);

        this.subs.filtered = this.movieQuery.movieSortedFiltered$.subscribe({
            next: (movies: Movie[]) => {
                this.movies = movies;
                this.scrollTop();
            }
        });

        this.subs.display = this.settingsQuery.displayType$
            .subscribe({
                next: (displayType: DisplayType) => {
                    this.displayType = displayType;
                }
            });
    }

    public scrollTop(): void {
        if (this.container) {
            this.container.nativeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    }
}
