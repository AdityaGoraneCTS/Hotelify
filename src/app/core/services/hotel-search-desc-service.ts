// src/app/core/services/hotel-search-desc-service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Hotel {
  id: string;
  name: string;
  location: string; // e.g., 'Guindy'
  city: string;     // e.g., 'Chennai' (for search functionality)
  features: string[]; // e.g., ['Pool', 'Free WiFi']
  isFullyRefundable: boolean;
  reserveNowPayLater?: boolean; // Added for 'Reserve now, pay later'
  rating: [number, number]; // MODIFIED: Changed to array [current_rating, max_rating]
  reviews: [number];       // MODIFIED: Changed to array [number_of_reviews]
  originalPrice: number;
  discountedPrice: number;
  discountPercentage?: number;
  totalPriceIncludesTaxes: number;
  images: string[];
  availabilityMessage?: string; // e.g., 'We have 5 left at'
}


@Injectable({
  providedIn: 'root'
})
export class HotelServices { // This should be HotelServices, matching your provided code
  private mockHotels: Hotel[] = [
    {
      id: 'h1',
      name: 'Hilton Chennai',
      location: 'Guindy',
      city: 'Chennai',
      features: ['Pool', 'Spa'],
      isFullyRefundable: true,
      // REMOVED: canCollectStamps: true,
      rating: [8.8, 10], // MODIFIED
      reviews: [335],    // MODIFIED
      originalPrice: 17286,
      discountedPrice: 14663,
      discountPercentage: 15,
      totalPriceIncludesTaxes: 17302,
      images: ['assets/hot.webp']
    },
    {
      id: 'h2',
      name: 'Pullman Chennai Anna Salai - Premium Brand By Accor',
      location: 'Anna Salai',
      city: 'Chennai',
      features: ['Pool', 'Gym'],
      isFullyRefundable: false,
      reserveNowPayLater: true,
      // REMOVED: canCollectStamps: true,
      rating: [8.8, 10], // MODIFIED
      reviews: [659],    // MODIFIED
      originalPrice: 7830,
      discountedPrice: 7830,
      totalPriceIncludesTaxes: 9239,
      images: ['/assets/hilton1.jpg']
    },
    {
      id: 'h3',
      name: 'Park Hyatt Chennai',
      location: 'Guindy',
      city: 'Chennai',
      features: ['Pool', 'Dining'],
      isFullyRefundable: true,
      // REMOVED: canCollectStamps: true,
      rating: [9.4, 10], // MODIFIED
      reviews: [494],    // MODIFIED
      originalPrice: 12000,
      discountedPrice: 12000,
      totalPriceIncludesTaxes: 14160,
      images: ['assets/hotel-images/park_hyatt_chennai_1.jpg'],
      availabilityMessage: 'We have 5 left at'
    },
    {
      id: 'h4',
      name: 'The Leela Palace Chennai',
      location: 'Adyar Sea Face',
      city: 'Chennai',
      features: ['Pool', 'Spa', 'Beach Access'],
      isFullyRefundable: true,
      // REMOVED: canCollectStamps: true,
      rating: [9.1, 10], // MODIFIED
      reviews: [1200],   // MODIFIED
      originalPrice: 25000,
      discountedPrice: 22500,
      discountPercentage: 10,
      totalPriceIncludesTaxes: 26550,
      images: ['assets/hotel-images/leela_palace_chennai_1.jpg']
    },
    {
      id: 'h5',
      name: 'ITC Grand Chola, a Luxury Collection Hotel, Chennai',
      location: 'Guindy',
      city: 'Chennai',
      features: ['Pool', 'Multiple Restaurants', 'Spa'],
      isFullyRefundable: true,
      // REMOVED: canCollectStamps: false,
      rating: [9.0, 10], // MODIFIED
      reviews: [1500],   // MODIFIED
      originalPrice: 18000,
      discountedPrice: 18000,
      totalPriceIncludesTaxes: 21240,
      images: ['assets/hotel-images/itc_grand_chola_1.jpg']
    },
    {
      id: 'h6',
      name: 'Taj Coromandel, Chennai',
      location: 'Nungambakkam',
      city: 'Chennai',
      features: ['Pool', 'Business Center'],
      isFullyRefundable: true,
      // REMOVED: canCollectStamps: true,
      rating: [8.7, 10], // MODIFIED
      reviews: [980],    // MODIFIED
      originalPrice: 10000,
      discountedPrice: 8500,
      discountPercentage: 15,
      totalPriceIncludesTaxes: 10030,
      images: ['assets/hotel-images/taj_coromandel_1.jpg']
    },
    {
      id: 'h7',
      name: 'GRT Grand, Chennai',
      location: 'T. Nagar',
      city: 'Chennai',
      features: ['Pool', 'Gym'],
      isFullyRefundable: true,
      // REMOVED: canCollectStamps: true,
      rating: [8.5, 10], // MODIFIED
      reviews: [720],    // MODIFIED
      originalPrice: 7000,
      discountedPrice: 7000,
      totalPriceIncludesTaxes: 8260,
      images: ['assets/hotel-images/grt_grand_1.jpg']
    }
  ];

  constructor() { }

  /**
   * Returns all mock hotels.
   */
  getHotels(): Observable<Hotel[]> {
    return of(this.mockHotels);
  }

  /**
   * Searches for hotels based on the provided query (city, location, or name).
   * @param query The search string.
   */
  searchHotels(query: string): Observable<Hotel[]> {
    if (!query) {
      return this.getHotels(); // Return all if query is empty
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredHotels = this.mockHotels.filter(hotel =>
      hotel.city.toLowerCase().includes(lowerCaseQuery) ||
      hotel.location.toLowerCase().includes(lowerCaseQuery) ||
      hotel.name.toLowerCase().includes(lowerCaseQuery)
    );
    return of(filteredHotels);
  }
}