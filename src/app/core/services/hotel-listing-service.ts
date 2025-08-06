import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelListingService {
  private apiUrl = 'http://localhost:3000/hotels';

  constructor(private http: HttpClient) {}

  saveHotel(hotelData: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotelData);
  }
}