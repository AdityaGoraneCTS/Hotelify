// src/app/core/services/auth-service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password?: string; // Add password as optional for type safety
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Use BehaviorSubject to manage the logged-in state and current user
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this._currentUser.asObservable();

  constructor() {
    this.checkInitialAuthStatus();
  }

  // Check localStorage on app start to see if a user is already logged in
  private checkInitialAuthStatus(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
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

  // Handle user login
  login(credentials: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // Simulate API call and delay
      return of({ success: true, user }).pipe(
        delay(500),
        tap((response) => {
          // Destructure to remove the password before storing in localStorage
          const { password, ...userWithoutPassword } = response.user;
          // Store the logged-in user in localStorage
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          // Update the observable states
          this._isLoggedIn.next(true);
          this._currentUser.next(userWithoutPassword);
        })
      );
    } else {
      return of({ success: false, message: 'Invalid credentials' }).pipe(delay(500));
    }
  }

  // Handle user logout
  logout(): void {
    this.clearAuthData();
    console.log('User logged out');
  }

  // Clears all authentication-related data
  private clearAuthData(): void {
    localStorage.removeItem('currentUser');
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
  }

  // Handle user registration
  register(userData: User): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: any) => u.email === userData.email);

    if (userExists) {
      return of({ success: false, message: 'User with this email already exists' }).pipe(delay(500));
    } else {
      userData.id = Math.random().toString(36).substr(2, 9); // Simple unique ID
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
      return of({ success: true, message: 'Registration successful' }).pipe(delay(500));
    }
  }
}