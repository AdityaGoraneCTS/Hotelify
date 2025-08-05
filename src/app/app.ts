import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { HomePage } from "./pages/home/home-page/home-page";
import { HomeCardComponent } from "./pages/Homecards/home-card-component/home-card-component";
import { HotelCardComponent} from './pages/hotel-search-cards/hotel-search-cards/hotel-search-cards';
import { SearchBarComponent } from "./shared/components/search-bar/search-bar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Hotelify');
}
