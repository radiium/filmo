import { Injectable } from '@angular/core';
import { Movie, MovieDetails, MovieDetailsType } from '@models';
import { v4 as uuidv4 } from 'uuid';
import { ElectronService } from './electron.service';

@Injectable()
export class ScanService extends ElectronService {
    private readonly NFO_FILE_PATTERN = '*.nfo';
    private readonly VIDEO_EXTENSIONS = ['.avi', '.mp4', '.mkv'];

    constructor(
    ) {
        super();
    }

    public scanMovie(input: string | string[]): string[] {
        const locations = Array.isArray(input) ? input : [input];
        const movieLocation = locations
            .map((dir: string) => this.buildMoviePattern(dir))
            .map((pattern: string) => this.globFiles(pattern))
            .reduce((acc: string[], item: string[]) => [...acc, ...item], []);

        return movieLocation;
    }

    public scan(input: string | string[]): Movie[] {
        const locations = Array.isArray(input) ? input : [input];
        const movies = locations.map((location: string) => {
            const pattern = this.buildMoviePattern(location);
            return this.globFiles(pattern)
                .map((filePath: string) => this.buildMovie(filePath, location));
        })
        .reduce((acc: Movie[], item: Movie[]) => [...acc, ...item], []);
        return movies;
    }

    private buildMoviePattern(dir: string): string {
        return `${dir}/**/**+(${this.VIDEO_EXTENSIONS.join('|')})`;
    }

    private buildNFOPattern(dir: string): string {
        return `${dir}/${this.NFO_FILE_PATTERN}`;
    }

    private globFiles(pattern: string): string[] {
        try {
            return this.glob.sync(pattern);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    buildMovie(filePath: string, location: string): Movie {
        const pathInfos = this.path.parse(filePath);
        const fileInfos = this.fs.statSync(filePath);

        const movie = new Movie(
            uuidv4(),
            pathInfos.dir,
            pathInfos.base,
            pathInfos.name,
            pathInfos.ext,
            fileInfos.size,
            location
        );

        try {
            const pattern = this.buildNFOPattern(pathInfos.dir);
            const nfoList = this.globFiles(pattern);
            if (nfoList[0]) {
                const details = this.buildMovieDetailsFromNFO(nfoList[0]);
                movie.addDetails(MovieDetailsType.KODI_NFO, details);
            } else {
                console.warn('error => nfo file not found');
            }
        } catch (error) {
            console.warn('error', error);
        }

        return movie;
    }

    buildMovieDetailsFromNFO(nfoFilePath: string): MovieDetails {
        const nfoContentXml = this.fs.readFileSync(nfoFilePath, { encoding: 'utf8' });
        const nfoContent = this.parser.parse(nfoContentXml, null, true);
        // console.log('nfoContent', nfoContent);
        const movieData = nfoContent.movie;

        return {
            imdbId: movieData.id,
            tmdbId: movieData.tmdbid,
            tmdbCollectionId: movieData.tmdbCollectionId,
            title: movieData.title,
            originalTitle: movieData.originaltitle,
            tagline: movieData.outline,
            overview: movieData.plot,
            languages: movieData.languages,
            releaseDate: new Date(movieData.premiered),
            year: movieData.year,
            country: movieData.country,
            genres: Array.isArray(movieData.genre) ? movieData.genre : [movieData.genre],
            tags: movieData.tag,
            ratings: movieData.ratings,
            duration: movieData.fileinfo.streamdetails.video.durationinseconds,
            posterPath: movieData.thumb
                ? movieData.thumb.replace('http://', 'https://')
                : '',
            bannerPath: movieData.fanart && movieData.fanart.thumb
                ? movieData.fanart.thumb.replace('http://', 'https://')
                : ''
        };
    }

    // buildMovieDetailsFromIMDB(imdbid: string): MovieDetails {
    //     return {
    //         imdbId: nfoContent.id,
    //         tmdbId: nfoContent.tmdbid,
    //         tmdbCollectionId: nfoContent.tmdbCollectionId,
    //         title: nfoContent.title,
    //         originalTitle: nfoContent.originaltitle,
    //         tagline: nfoContent.outline,
    //         overview: nfoContent.plot,
    //         languages: nfoContent.languages,
    //         releaseDate: new Date(nfoContent.premiered),
    //         year: nfoContent.year,
    //         country: nfoContent.country,
    //         genres: nfoContent.genre,
    //         tags: nfoContent.tag,
    //         posterPath: nfoContent.tmdbid,
    //         bannerPath: nfoContent.tmdbid
    //     };
    // }


}
