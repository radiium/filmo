import { Injectable } from '@angular/core';
import { ScanService } from '@core/services/scan.service';
import { MovieStore, initialState } from './movie.store';
import { MovieState } from './movie.model';
import { Movie, MovieFilterType, SidebarState, SortOrderType, SortType, YearFilter } from '@models';

@Injectable({ providedIn: 'root' })
export class MovieService {
    constructor(
        private store: MovieStore,
        private scanSrv: ScanService,
    ) {
    }

    select(value: string): void {
        this.store.setActive(value);
    }

    selectPrev(): void {
        this.store.setActive({ prev: true });
    }

    selectNext(): void {
        this.store.setActive({ next: true });
    }


    addMany(value: Movie | Movie[]): void {
        this.store.setLoading(true);
        this.store.add(value);
        this.store.setLoading(false);
    }

    addLocation(value: string | string[]): void {
        this.store.setLoading(true);
        const currentState = this.store.getValue();
        const locations = (Array.isArray(value) ? value : [value])
            .filter((item: string) => (!currentState.ui.locations.includes(item)));

        const movies = this.scanSrv.scan(locations);

        this.store.add(movies);
        this.store.update((state: MovieState) => {
            const uiState = this.buildUiState(state, locations);
            return {
                ui: uiState
            };
        });

        this.store.setLoading(false);
    }

    removeLocation(value: string): void {
        this.store.setLoading(true);
        this.store.remove(({ location }) => (location === value));
        this.store.update((state: MovieState) => {
            const locations = state.ui.locations.filter((location: string) => location !== value);
            const newState = {
                ...state,
                ui: {
                    ...state.ui,
                    locations
                }
            };
            return {
                ui: this.buildUiState(newState, [])
            };
        });
        this.store.setLoading(false);
    }

    private buildUiState(state: MovieState, newLocations: string[]): any {
        const movies = Object.values(state.entities);

        const locations = [...state.ui.locations, ...newLocations];
        const filters = JSON.parse(JSON.stringify(state.ui.filters));
        const sorters = JSON.parse(JSON.stringify(state.ui.sorters));
        const sidebar = new SidebarState();

        sidebar.allCount = movies.length;

        const allLocationsTemp = locations.reduce((acc: any, curr: string) => {
            acc[curr] = 0;
            return acc;
        }, {});

        movies.forEach((movie: Movie) => {
            if (movie.details) {
                sidebar.foundCount++;
                movie.details.genres.forEach((genre: string) => {
                    if (!sidebar.allGenres.includes(genre) && genre) {
                        sidebar.allGenres.push(genre);
                    }
                });
                sidebar.allYears.push(movie.details.year);
            } else {
                sidebar.notFoundCount++;
            }

            locations.forEach((location: string) => {
                if (movie.dir.includes(location)) {
                    allLocationsTemp[location]++;
                }
            });

        });

        sidebar.allGenres.sort();
        sidebar.allYears.sort();

        sidebar.allLocations = Object
            .keys(allLocationsTemp)
            .sort()
            .map((key: string) => ({
                label: key,
                count: allLocationsTemp[key]
            }));

        sidebar.minMaxYears = {
            lower: sidebar.allYears[0] || null,
            upper: sidebar.allYears[sidebar.allYears.length - 1] || null
        };
        if (filters.years.lower === null) {
            filters.years.lower = sidebar.minMaxYears.lower;
        }
        if (filters.years.upper === null) {
            filters.years.upper = sidebar.minMaxYears.upper;
        }

        return {
            locations,
            filters,
            sorters,
            sidebar
        };
    }

    setSortOrderType(value: SortOrderType): void {
        this.store.update((state: MovieState) => ({
            ui: {
                ...state.ui,
                filters: {
                    ...initialState.ui.sorters,
                    order: value,
                }
            }
        }));
    }
    setSortType(value: SortType): void {
        this.store.update((state: MovieState) => ({
            ui: {
                ...state.ui,
                sorters: {
                    ...initialState.ui.sorters,
                    by: value,
                }
            }
        }));
    }

    setFiltersType(value: MovieFilterType): void {
        this.store.update((state: MovieState) => ({
            ui: {
                ...state.ui,
                filters: {
                    ...initialState.ui.filters,
                    type: value,
                }
            }
        }));
    }
    search(value: string): void {
        this.store.update((state: MovieState) => ({
            ui: {
                ...state.ui,
                filters: {
                    ...initialState.ui.filters,
                    type: MovieFilterType.QUERY,
                    query: value
                }
            }
        }));
    }
    setFiltersGenre(value: string): void {
        this.store.update((state: MovieState) => ({
            ui: {
                ...state.ui,
                filters: {
                    ...initialState.ui.filters,
                    type: MovieFilterType.GENRES,
                    genre: value
                }
            }
        }));
    }
    setFiltersYears(value: YearFilter): void {
        this.store.update((state: MovieState) => ({
            ui: {
                ...state.ui,
                filters: {
                    ...initialState.ui.filters,
                    type: MovieFilterType.YEARS,
                    years: value
                }
            }
        }));
    }
    setFiltersRate(value: string): void {
        this.store.update((state: MovieState) => ({
            ui: {
                ...state.ui,
                filters: {
                    ...initialState.ui.filters,
                    type: MovieFilterType.RATE,
                    rate: value
                }
            }
        }));
    }

    setFiltersLocation(value: string): void {
        this.store.update((state: MovieState) => ({
            ui: {
                ...state.ui,
                filters: {
                    ...initialState.ui.filters,
                    type: MovieFilterType.LOCATION,
                    location: value
                }
            }
        }));
    }
}
