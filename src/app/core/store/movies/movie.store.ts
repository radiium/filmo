import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { MovieState } from './movie.model';
import { MovieFilterType, SortOrderType, SortType } from '@models';

export const initialState: Partial<MovieState> = {
    ui: {
        locations: [],
        sorters: {
            by: SortType.TITLE,
            order: SortOrderType.ASCENDING
        },
        filters: {
            query: '',
            type: MovieFilterType.ALL,
            genre: null,
            location: null,
            rate: null,
            years: {
                lower: null,
                upper: null
            }
        },
        sidebar: {
            allCount: 0,
            foundCount:  0,
            notFoundCount: 0,
            allLocations: [],
            allGenres:  [],
            allYears: [],
            minMaxYears: {
                lower: 0,
                upper: 0
            }
        },
    }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'movies' })
export class MovieStore extends EntityStore<MovieState> {
    constructor() {
        super(initialState);
    }
}
