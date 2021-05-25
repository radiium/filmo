import { EntityState, ActiveState } from '@datorama/akita';
import { Movie, MovieSorter, MovieFilter, SidebarState } from '@models';

export const moviesFeatureKey = 'movies';

export interface MovieState extends EntityState<Movie, string>, ActiveState {
    ui: {
        locations: string[];
        sorters: MovieSorter;
        filters: MovieFilter;
        sidebar: SidebarState;
    };
}
