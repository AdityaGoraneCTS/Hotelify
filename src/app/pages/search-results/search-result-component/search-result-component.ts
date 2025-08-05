// search-result-component.ts

import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel-service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, Observable } from 'rxjs'; // Make sure to import map and Observable

import { provideHttpClient } from '@angular/common/http';
import { HotelCardComponent } from '../hotel-search-cards/hotel-search-cards';

@Component({
  selector: 'app-search-result-component',
  standalone: true,
  imports: [CommonModule, HotelCardComponent, SearchBarComponent],
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
          let hotelObservable: Observable<Hotel[]>;
          
          if (params['location']) {
            this.searchQuery = params['location'];
            hotelObservable = this.hotelService.searchHotelsByLocation(this.searchQuery);
          } else if (params['type']) {
            this.searchQuery = params['type'];
            hotelObservable = this.hotelService.searchHotelsByType(this.searchQuery);
          } else if (params['hotelId']) {
            hotelObservable = this.hotelService.getHotelById(params['hotelId']).pipe(
              map(hotel => hotel ? [hotel] : [])
            );
          } else {
            this.searchQuery = 'All';
            // FIX: Changed getHotels() to getAllHotels()
            hotelObservable = this.hotelService.getAllHotels();
          }
          
          return hotelObservable;
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