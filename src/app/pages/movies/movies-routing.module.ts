import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailPageComponent } from './detail/movie-detail-page.component';
import { MoviesPage } from './list/movies.page';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: MoviesPage,
            },
            {
                path: 'detail',
                component: MovieDetailPageComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoviesPageRoutingModule { }
