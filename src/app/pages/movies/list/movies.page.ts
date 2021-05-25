import { Component, Injector } from '@angular/core';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';

@Component({
    selector: 'app-movies',
    templateUrl: 'movies.page.html',
    styleUrls: ['movies.page.scss'],
})
export class MoviesPage extends ComponentAbstract {
    constructor(
        public injector: Injector) {
        super(injector);
    }
}
