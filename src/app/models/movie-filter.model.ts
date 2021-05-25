import { MovieFilterType } from './movie-filter-type.enum';
import { YearFilter } from './year-filter.model';

export interface MovieFilter {
    query: string;
    type: MovieFilterType;
    genre: string;
    rate: string | number;
    location: string;
    years: YearFilter;
}
