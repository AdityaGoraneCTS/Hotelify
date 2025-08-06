import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home-page/home-page';

import { HotelCardComponent } from './pages/search-results/hotel-search-cards/hotel-search-cards';



import { SearchBarComponent } from './shared/components/search-bar/search-bar';
import { SearchResultComponent } from './pages/search-results/search-result-component/search-result-component';
import { LoginPage } from './pages/auth/login-page/login-page';
import { RegistrationPage } from './pages/auth/registration-page/registration-page';
import { AddHotelPageComponent } from './pages/hotels/add-hotel/add-hotel-page/add-hotel-page';
import { AdminGuard } from './core/guards/admin.guard-guard';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'hotel-cards', component: HotelCardComponent },

    { path: '', component: SearchBarComponent },
    { path: 'search-results', component: SearchResultComponent },

    { path: 'results', component: SearchResultComponent },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegistrationPage },
    {
        path: 'add-hotel',
        component: AddHotelPageComponent,
        canActivate: [AdminGuard]
    }
];