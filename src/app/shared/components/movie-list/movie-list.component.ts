import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '@core/store/movies/movie.service';
import { Movie } from '@models';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent extends ComponentAbstract implements OnInit {

    @Input()
    public movies: Movie[] = [];

    constructor(
        public injector: Injector,
        private router: Router,
        private movieSevice: MovieService
    ) {
        super(injector);
    }

    ngOnInit() { }

    openMovieDetail(id: any) {
        this.movieSevice.select(id);
        this.router.navigate(['movies', 'detail']);
    }

    trackByFn(index: number, item: Movie): number | string {
        return item.id;
    }
}
