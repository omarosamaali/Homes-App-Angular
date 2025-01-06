import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { DetailsComponent } from './app/details/details.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'detalis/:id',
        component: DetailsComponent,
        title: 'Details Page'
    }
];

export default appRoutes;