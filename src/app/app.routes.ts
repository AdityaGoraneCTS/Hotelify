import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home-page/home-page';
import { SearchResultComponent } from './pages/search-results/search-result-component/search-result-component';
import { LoginPage } from './pages/auth/login-page/login-page';
import { RegistrationPage } from './pages/auth/registration-page/registration-page';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details-component/hotel-details-component';

export const routes: Routes = [
    { path: '', component: HomePage },

    
    { path: 'search-results', component: SearchResultComponent },

    { path: 'results', component: SearchResultComponent },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegistrationPage },


    { path: 'hotel-details/:id', component: HotelDetailsComponent }, 

];