import { Injectable } from '@angular/core';
import { QueryEntity, EntityUIQuery } from '@datorama/akita';
import { MovieState } from './movie.model';
import { MovieStore } from './movie.store';
import { Movie, MovieFilterType, SidebarState, SortOrderType, SortType } from '@models';
import Fuse from 'fuse.js';

@Injectable({
    providedIn: 'root'
})
export class MovieQuery extends QueryEntity<MovieState> {
    selected$ = this.selectActive();
    movieSortedFiltered$ = this.select(this.sortFilter.bind(this));
    locations$ = this.select((state: MovieState) => state.ui.locations);
    sorters$ = this.select((state: MovieState) => state.ui.sorters);
    filters$ = this.select((state: MovieState) => state.ui.filters);
    sidebar$ = this.select((state: MovieState) => state.ui.sidebar);
    query$ = this.select((state: MovieState) => state.ui.filters.query);
    isLoading$ = this.selectLoading();
    error$ = this.selectError();

    constructor(protected store: MovieStore) {
        super(store);
    }

    private sortFilter(state: MovieState): any {
        let movies = this.getAll();

        if (!movies) {
            return [];
        }

        // filters
        switch (state.ui.filters.type) {
            case MovieFilterType.ALL:
                break;

            case MovieFilterType.FOUND:
                movies = movies.filter((movie: Movie) => {
                    return movie.details ? true : false;
                });
                break;

            case MovieFilterType.NOT_FOUND:
                movies = movies.filter((movie: Movie) => {
                    return movie.details ? false : true;
                });
                break;

            case MovieFilterType.QUERY:
                console.log(state.ui.filters.query);
                if (state.ui.filters.query) {
                    const fuse = new Fuse(movies, {
                        shouldSort: true,
                        ignoreLocation: true,
                        includeScore: true,
                        includeMatches: true,
                        threshold: 0.3,
                        keys: [
                            // 'fileBase',
                            'details.title',
                            // 'details.originalTitle',
                            // 'details.country',
                            // 'details.languages',
                            // 'details.genres',
                            // 'details.tags'
                        ]
                    });
                    movies = fuse.search(state.ui.filters.query).map((obj: any) => obj.item as Movie);
                    // console.log('movies result', fuse.search(state.ui.filters.query));

                }
                break;

            case MovieFilterType.GENRES:
                movies = movies.filter((movie: Movie) => {
                    return (state.ui.filters.genre !== null) && (movie.details !== null && movie.details !== undefined)
                        ? movie.details.genres.includes(state.ui.filters.genre)
                        : false;
                });
                break;

            case MovieFilterType.YEARS:
                movies = movies.filter((movie: Movie) => {
                    return state.ui.filters.years.lower !== null && state.ui.filters.years.upper !== null && movie.details
                        ? movie.details.year >= state.ui.filters.years.lower && movie.details.year <= state.ui.filters.years.upper
                        : true;
                });

                break;

            case MovieFilterType.LOCATION:
                movies = movies.filter((movie: Movie) => {
                    return state.ui.filters.location !== null
                        ? movie.dir.includes(state.ui.filters.location)
                        : true;
                });
                break;

            case MovieFilterType.RATE:
                movies = movies.filter((movie: Movie) => {
                    return state.ui.filters.rate !== null
                        ? movie.details.ratings.rating.value === state.ui.filters.rate
                        : true;
                });
                break;

            default:
                break;
        }


        // Sorters
        switch (state.ui.sorters.by) {
            case SortType.TITLE:
                // movies.sort(sortByString('details.title'));
                break;

            case SortType.RELEASE_DATE:
                movies.sort(this.sortByString('details.filecreatedDate'));
                break;

            case SortType.CREATED_DATE:
                movies.sort(this.sortByString('details.filecreatedDate'));
                break;

            case SortType.YEAR:
                movies.sort(this.sortByNumber('details.year'));
                break;

            case SortType.SIZE:
                movies.sort(this.sortByNumber('fileSize'));
                break;

            case SortType.DURATION:
                movies.sort(this.sortByNumber('fileinfo.streamdetails.video.durationinseconds'));
                break;

            case SortType.RATE:
                movies.sort(this.sortByNumber('ratings.rating.value'));
                break;

            case SortType.DEFAULT:
            default:
                break;
        }

        if (state.ui.sorters.order === SortOrderType.DESCENDING) {
            return movies.reverse();
        }

        return movies;
    }

    private sortByString(prop: string): any {
        return (a: Movie, b: Movie) => (a[prop].localeCompare(b[prop]));
    }

    private sortByNumber(prop: string): any {
        return (a: Movie, b: Movie) => (a[prop] - b[prop]);
    }

    private sortByDate(prop: string): any {
        return (a: Movie, b: Movie) => (new Date(a[prop]).getTime() - new Date(b[prop]).getTime());
    }
}
