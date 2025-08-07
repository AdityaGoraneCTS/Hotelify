import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
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

  // New method to simulate image upload
  uploadImages(files: File[]): Observable<string[]> {
    console.log('Simulating image upload for files:', files.map(f => f.name));

    // In a real app, you would use HttpClient to post files to an endpoint
    // return this.http.post<string[]>('your-upload-api-endpoint', files);

    // For this mock, we return an array of mock permanent URLs
    const mockUrls = files.map((file, index) => 
      `https://example.com/images/hotel-${Date.now()}/${index}-${file.name}`
    );
    return of(mockUrls).pipe(delay(1500)); // Simulate a delay
  }
}