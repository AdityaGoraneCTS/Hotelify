import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations = [
    'Chennai',
    'Guindy, Chennai',
    'Anna Salai',
    'Mumbai',
    'Colaba, Mumbai',
    'Hyderabad',
    'Banjara Hills, Hyderabad',
    'Bengaluru',
    'Ashok Nagar, Bengaluru',
    'New Delhi',
    'Chanakyapuri, New Delhi',
    'Jaipur',
    'Goner Road, Jaipur',
    'Goa',
    'Candolim, Goa',
    'Kolkata',
    'Esplanade, Kolkata',
    'Pune',
    'Viman Nagar, Pune',
    'Agra',
    'Fatehabad Road, Agra',
    'Udaipur',
    'Lake Pichola, Udaipur'
  ];

  getLocationSuggestions(query: string) {
    const filtered = this.locations.filter(loc =>
      // Change from `.includes()` to `.startsWith()`
      loc.toLowerCase().startsWith(query.toLowerCase())
    );
    return of(filtered).pipe(delay(200)); // simulate delay
  }
}