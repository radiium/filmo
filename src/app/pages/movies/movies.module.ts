import { NgModule } from '@angular/core';
import { MoviesPage } from './list/movies.page';
import { MovieDetailPageComponent } from './detail/movie-detail-page.component';
import { MoviesPageRoutingModule } from './movies-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        MoviesPageRoutingModule
    ],
    declarations: [
        MoviesPage,
        MovieDetailPageComponent
    ]
})
export class MoviesPageModule { }
