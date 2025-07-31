import { Component } from '@angular/core';
import { SearchBarComponent } from "../../../shared/components/search-bar/search-bar";

@Component({
  selector: 'app-home-page',
  imports: [SearchBarComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
