import { Injectable, inject } from '@angular/core';
import { Hotel } from './../models/hotel.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private http = inject(HttpClient);
  private hotelsUrl = 'http://localhost:3000/hotels'; // URL for your json-server

  // Fetches all hotels and performs client-side filtering
  searchHotels(query: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelsUrl).pipe(
      map(allHotels => {
        if (!query) {
          return allHotels; // If no query, return all hotels
        }
        const lowerCaseQuery = query.toLowerCase();
        return allHotels.filter(hotel =>
          hotel.city.toLowerCase().includes(lowerCaseQuery) ||
          hotel.location.toLowerCase().includes(lowerCaseQuery) ||
          hotel.name.toLowerCase().includes(lowerCaseQuery)
        );
      })
    );
  }
}



