import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Using BehaviorSubject to manage login state
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this._currentUser.asObservable();

  constructor() {
    // On app load, check for a stored token/user session
    this.checkInitialAuthStatus();
  }

  private checkInitialAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');
    if (token && userData) {
      try {
        const user: User = JSON.parse(userData);
        this._isLoggedIn.next(true);
        this._currentUser.next(user);
      } catch (e) {
        console.error('Failed to parse user data from localStorage', e);
        this.clearAuthData();
      }
    } else {
      this.clearAuthData();
    }
  }

  login(credentials: any): Observable<any> {
    // Simulate API call
    return of({ token: 'mock-jwt-token', user: { id: '123', name: 'John Doe', email: 'john@example.com' } }).pipe(
      delay(1000), // Simulate network delay
      tap(response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this._isLoggedIn.next(true);
        this._currentUser.next(response.user);
      })
    );
  }

  logout(): void {
    this.clearAuthData();
    console.log('User logged out');
  }

  private clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
  }

  // You would typically have a register method here as well
  register(userData: any): Observable<any> {
    // Simulate registration API call
    return of({ success: true, message: 'Registration successful' }).pipe(delay(1000));
  }
}