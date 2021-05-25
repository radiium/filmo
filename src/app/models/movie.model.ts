import { MovieDetailsType } from './movie-details-type.enum';
import { MovieDetails } from './movie-details.model';

export class Movie {
    id: string;
    location: string;
    dir: string;
    fileBase: string;
    fileName: string;
    fileExt: string;
    fileSize: number;
    details: MovieDetails;
    detailsType: MovieDetailsType;
    nfoName: string;

    constructor(
        id: string,
        dir: string,
        fileBase: string,
        fileName: string,
        fileExt: string,
        fileSize: number,
        location: string
    ) {
        this.id = id;
        this.dir = dir;
        this.fileBase = fileBase;
        this.fileName = fileName;
        this.fileExt = fileExt;
        this.fileSize = fileSize;
        this.location = location;
        this.detailsType = MovieDetailsType.UNKNOWN;
    }

    addDetails(type: MovieDetailsType, details: MovieDetails) {
        this.detailsType = type;
        this.details = details;
    }
}
