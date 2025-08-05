import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations = [
    'Chennai', 'Guindy', 'Anna Salai',
    'Mumbai', 'Colaba',
    'Hyderabad', 'Banjara Hills',
    'Bengaluru', 'Ashok Nagar', 'New Delhi', 'Chanakyapuri',
    'Jaipur', 'Goner Road', 'Goa', 'Candolim',
    'Kolkata', 'Esplanade',
    'Pune', 'Viman Nagar',
    'Agra', 'Fatehabad Road',
    'Udaipur', 'Lake Pichola'
  ];

  getLocationSuggestions(query: string) {
    const filtered = this.locations.filter(loc =>
      loc.toLowerCase().startsWith(query.toLowerCase())
    );
    return of(filtered).pipe(delay(200));
  }
}