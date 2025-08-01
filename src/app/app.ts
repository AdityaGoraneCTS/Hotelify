import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { HomePage } from "./pages/home/home-page/home-page";
import { HomeCardComponent } from "./pages/Homecards/home-card-component/home-card-component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HomeCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Hotelify');
}
