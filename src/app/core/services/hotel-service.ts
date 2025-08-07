// hotel.service.ts

import { Injectable, inject } from '@angular/core';
import { Hotel } from './../models/hotel.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private http = inject(HttpClient);
  private hotelsUrl = 'http://localhost:3000/hotels';

  searchHotels(query: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelsUrl).pipe(
      map(allHotels => {
        if (!query) {
          return allHotels;
        }
        const lowerCaseQuery = query.toLowerCase();
        return allHotels.filter(hotel =>
          hotel.name.toLowerCase().includes(lowerCaseQuery) ||
          (hotel.address.area && hotel.address.area.toLowerCase().includes(lowerCaseQuery)) ||
          hotel.address.city.toLowerCase().includes(lowerCaseQuery) ||
          hotel.address.state.toLowerCase().includes(lowerCaseQuery) ||
          hotel.address.country.toLowerCase().includes(lowerCaseQuery)
        );
      })
    );
  }

  getHotelById(id: string): Observable<Hotel | undefined> {
    return this.http.get<Hotel[]>(this.hotelsUrl).pipe(
      map(hotels => hotels.find(hotel => hotel.id === id))
    );
  }

  // --- MODIFIED METHODS ---

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelsUrl);
  }

  searchHotelsByLocation(location: string): Observable<Hotel[]> {
    const lowerCaseLocation = location.toLowerCase();
    return this.http.get<Hotel[]>(this.hotelsUrl).pipe(
      map(allHotels => {
        return allHotels.filter(hotel =>
          // The fix: Add a nullish check for hotel.address.city
          hotel.address.city && hotel.address.city.toLowerCase() === lowerCaseLocation
        );
      })
    );
  }

  searchHotelsByType(type: string): Observable<Hotel[]> {
    const lowerCaseType = type.toLowerCase();
    return this.http.get<Hotel[]>(this.hotelsUrl).pipe(
      map(allHotels => {
        return allHotels.filter(hotel =>
          // The fix: Add a nullish check for hotel.type
          hotel.type && hotel.type.toLowerCase() === lowerCaseType
        );
      })
    );
  }
}