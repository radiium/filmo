import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Movie } from '@models';

@Component({
    selector: 'app-movie-grid-list-item',
    templateUrl: './movie-grid-list-item.component.html',
    styleUrls: ['./movie-grid-list-item.component.scss'],
})
export class MovieGridListItemComponent implements OnInit, OnChanges {

    @Input()
    public movie: Movie;

    public title: string = '';
    public poster: string = '';
    public isVisible: boolean = false;
    constructor() { }

    ngOnInit() { }
    ngOnChanges(change: SimpleChanges) {
        if (change.movie && change.movie.currentValue) {
            if (this.movie.details) {
                this.title = this.movie.details.title;
                this.poster = this.movie.details.posterPath;
            } else {
                this.title = this.movie.fileName;
                this.poster = 'assets/images/fallback-image.png'
            }
        }
    }

    show(isVisible: boolean) {
        this.isVisible = isVisible;
    }
}
