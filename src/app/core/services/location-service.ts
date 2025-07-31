import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations = [
    'Mumbai', 'Delhi', 'Pune', 'Bangalore',
    'Hyderabad', 'Goa', 'Chennai', 'Kolkata'
  ];
  getLocationSuggestions(query: string) {
    const filtered = this.locations.filter(loc =>
      loc.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(200)); // simulate delay
  }
}