export class SidebarState {
    allCount: number;
    foundCount: number;
    notFoundCount: number;

    allLocations: any[];
    allGenres: string[];
    allYears: number[];
    minMaxYears: any;

    constructor() {
        this.allCount = 0;
        this.foundCount = 0;
        this.notFoundCount = 0;

        this.allLocations = [];
        this.allGenres = [];
        this.allYears = [];
    }
}
