import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IMDBService {

    private readonly API_V3_BASE_URL: string = 'https://api.themoviedb.org/3/';
    private readonly API_V3_KEY: string = '';
    private readonly API_V4_BASE_URL: string = 'https://api.themoviedb.org/4/';
    private readonly API_V4_KEY: string = '';
    private readonly API_LANGUAGE: string = 'fr-FR';

    constructor(private http: HttpClient) {
    }

    /*
    https://api.themoviedb.org/3/movie/9326?api_key=eadf68ab14df2a8ab8f5f769af67c5d0&language=fr-FR
    */
    getMovieById(id: string | number) {
        return this.http.get<any>(
            `${this.API_V3_BASE_URL}movie/${id}?api_key=${this.API_V3_KEY}&language=${this.API_LANGUAGE}`
        );
    }

    /*
    https://api.themoviedb.org/3/find/9326?api_key=eadf68ab14df2a8ab8f5f769af67c5d0&language=fr-FR
    */
    find(id: string | number) {
        return this.http.get<any>(
            `${this.API_V3_BASE_URL}find/${id}?api_key=${this.API_V3_KEY}&language=${this.API_LANGUAGE}`
        );
    }

    /*
    https://api.themoviedb.org/3/search/multi?api_key=eadf68ab14df2a8ab8f5f769af67c5d0&query=Week-end&language=fr-FR
    */
    searchMovies(term: string) {
        return this.http.get<any>(
            `${this.API_V3_BASE_URL}search/multi?api_key=${this.API_V3_KEY}&query=${term}&language=${this.API_LANGUAGE}`
        );
    }
}
