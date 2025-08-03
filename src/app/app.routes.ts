import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home-page/home-page';

import { HotelCardComponent } from './pages/hotel-search-cards/hotel-search-cards/hotel-search-cards';
import { SearchBarComponent } from './shared/components/search-bar/search-bar';
import { SearchResultComponent } from './pages/search-results/search-result-component/search-result-component';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'hotel-cards', component: HotelCardComponent },

    { path: '', component: SearchBarComponent},
    { path: 'search-results', component: SearchResultComponent },

    { path: 'results', component: SearchResultComponent},
];
