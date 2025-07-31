import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home-page/home-page';
import { SearchResultsPage } from './pages/search-results/search-results-page/search-results-page';
import { HotelSearchCards } from './pages/hotel-search-cards/hotel-search-cards/hotel-search-cards';

export const routes: Routes = [
    {path:'', component:HomePage},
    {path:'search-results', component:SearchResultsPage},
    {path:'hotel-cards', component:HotelSearchCards}
];
