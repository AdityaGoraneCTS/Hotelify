import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel-service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { HotelCardComponent } from '../hotel-search-cards/hotel-search-cards';
@Component({
  selector: 'app-search-result-component',
  imports: [CommonModule, HotelCardComponent],
  templateUrl: './search-result-component.html',
  styleUrl: './search-result-component.css'
})
export class SearchResultComponent {
  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);

  hotels = signal<Hotel[]>([]);
  searchQuery = '';

  constructor() {
    this.route.queryParams
      .pipe(
        switchMap(params => {
          this.searchQuery = params['location'] || '';
          return this.hotelService.searchHotels(this.searchQuery);
        })
      )
      .subscribe({
        next: (data) => {
          this.hotels.set(data);
          console.log('Hotels received and set:', this.hotels());
        },
        error: (err) => {
          console.error('Error fetching hotels:', err);
        }
      });
  }
}
