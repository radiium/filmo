export interface MovieDetails {
    imdbId: string | number;
    tmdbId: string | number;
    tmdbCollectionId: string;
    title: string;
    originalTitle: string;
    tagline: string;
    overview: string;
    languages: string;
    releaseDate: Date;
    year: number;
    country: string[];
    genres: string[];
    tags: string[];
    ratings: any;
    duration: number;
    posterPath: string;
    bannerPath: string;
}
