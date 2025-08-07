// src/app/core/services/home-card-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hotel } from '../models/hotel.model';
import { DiscoverCards, PopularCards, TopDealCards, UniqueCards } from '../models/home-cards-model';

@Injectable({
  providedIn: 'root'
})
export class HomeCardService {
  
  private hotelUrl = 'http://localhost:3000/hotels';

  constructor(private http: HttpClient) {}

  // Fetch all hotels from the json-server API
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelUrl);
  }

  // Map hotels to DiscoverCards format
  getDiscoverCards(): Observable<DiscoverCards[]> {
    return this.getHotels().pipe(
      map(hotels => {
        const types = ['Hotel', 'Apartment', 'Resort', 'Villa', 'Cabin', 'Cottage', 'Guest House'];
        return types.map((type, index) => {
          const hotel = hotels.find(h => h.type === type);
          return {
            id: index + 1,
            title: type + 's',
            type: type,
            image: hotel ? hotel.images[0] : 'https://placehold.co/263x210'
          };
        });
      })
    );
  }

  // Map hotels to PopularCards format
  getPopularCards(): Observable<PopularCards[]> {
    return this.getHotels().pipe(
      map(hotels => {
        // FIX: Add more cities to this array to create more cards.
        const popularCities = ['Chennai', 'Hyderabad', 'Mumbai', 'New Delhi', 'Bengaluru', 'Pune', 'Kolkata', 'Jaipur'];
        return popularCities.map((city, index) => {
          const hotel = hotels.find(h => h.address.city === city);
          return {
            id: index + 1,
            title: city,
            image: hotel ? hotel.images[0] : 'https://placehold.co/170x136'
          };
        });
      })
    );
  }

  // Map hotels to UniqueCards format
  getUniqueCards(): Observable<UniqueCards[]> {
    return this.getHotels().pipe(
      map(hotels => {
        return hotels.filter(h => h.type === 'Cottage' || h.type === 'Apartment' || h.type === 'Villa')
          .map(hotel => ({
            id: Number(hotel.id),
            title: hotel.name,
            hotelName: hotel.name,
            city: hotel.address.city,
            rating: hotel.rating,
            originalPrice: hotel.rooms[0].originalPrice,
            offerPrice: hotel.rooms[0].discountedPrice,
            image: hotel.images[0],
            type: hotel.type
          }));
      })
    );
  }

  // Map hotels to TopDealCards format
  getTopDealCards(): Observable<TopDealCards[]> {
    return this.getHotels().pipe(
      map(hotels => {
        return hotels.filter(h => h.rooms.length > 0 && h.rooms[0].discountedPrice < h.rooms[0].originalPrice)
          .map(hotel => ({
            id: Number(hotel.id),
            title: 'Top Deal',
            hotelName: hotel.name,
            city: hotel.address.city,
            rating: hotel.rating,
            originalPrice: hotel.rooms[0].originalPrice,
            offerPrice: hotel.rooms[0].discountedPrice,
            image: hotel.images[0],
            type: hotel.type
          }));
      })
    );
  }
}