import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '@core/services/system.service';
import { MovieQuery } from '@core/store/movies/movie.query';
import { MovieService } from '@core/store/movies/movie.service';
import { Movie } from '@models';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';

@Component({
    selector: 'app-movie-detail-page',
    templateUrl: './movie-detail-page.component.html',
    styleUrls: ['./movie-detail-page.component.scss'],
})
export class MovieDetailPageComponent extends ComponentAbstract implements OnInit {

    public movie: Movie;
    public poster: string;
    public banner: string;
    public altImg: string;

    constructor(
        public injector: Injector,
        private router: Router,
        private movieService: MovieService,
        private movieQuery: MovieQuery,
        private systemService: SystemService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.subs.selected = this.movieQuery.selected$.subscribe({
            next: (movie: Movie) => {
                if (!movie) {
                    this.navToMovieList();
                    return;
                } else {
                    this.movie = movie;
                }
                this.parseMovieImage(this.movie);
            }
        });
    }

    private parseMovieImage(movie: Movie): void {
        if (movie.details) {
            if (movie.details.posterPath) {
                this.poster = movie.details.posterPath;
            }
            if (movie.details.bannerPath) {
                this.banner = movie.details.bannerPath;
            }
            if (movie.details.title) {
                this.altImg = `image of ${movie.details.title}`;
            }
        }
    }

    navToMovieList(): void {
        this.router.navigate(['movies']);
    }

    selectPrev(): void {
        this.movieService.selectPrev();
    }

    selectNext(): void {
        this.movieService.selectNext();
    }

    play(): void {
        this.systemService.play(this.movie);
    }

    showFile(): void {
        this.systemService.showItemInFolder(this.movie);
    }

    openTMDBMoviPage(): void {
        const link = `https://www.themoviedb.org/movie/${this.movie.details.tmdbId}`;
        this.systemService.openExternalLink(link);
    }
}
