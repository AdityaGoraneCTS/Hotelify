// src/app/core/services/auth-service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password?: string; 
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this._currentUser.asObservable();

  constructor() {
    this.checkInitialAuthStatus();
  }

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

  login(credentials: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      return of({ success: true, user }).pipe(
        delay(500),
        tap((response) => {
          const { password, ...userWithoutPassword } = response.user;
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          this._isLoggedIn.next(true);
          this._currentUser.next(userWithoutPassword);
        })
      );
    } else {
      return of({ success: false, message: 'Invalid credentials' }).pipe(delay(500));
    }
  }

  logout(): void {
    this.clearAuthData();
    console.log('User logged out');
  }

  private clearAuthData(): void {
    localStorage.removeItem('currentUser');
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
  }

  register(userData: User): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: any) => u.email === userData.email);

    if (userExists) {
      return of({ success: false, message: 'User with this email already exists' }).pipe(delay(500));
    } else {
      userData.id = Math.random().toString(36).substr(2, 9);
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
      return of({ success: true, message: 'Registration successful' }).pipe(delay(500));
    }
  }

  // New method to update the user's profile
  updateProfile(updatedUser: User): Observable<any> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === this._currentUser.value?.email);

    if (userIndex > -1) {
      // Preserve the password
      const currentPassword = users[userIndex].password;
      const updatedUserWithPassword = { ...updatedUser, password: currentPassword };
      users[userIndex] = updatedUserWithPassword;
      localStorage.setItem('users', JSON.stringify(users));

      // Update currentUser observable and localStorage
      const { password, ...userWithoutPassword } = updatedUserWithPassword;
      this._currentUser.next(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return of({ success: true, message: 'Profile updated successfully' }).pipe(delay(500));
    } else {
      return throwError(() => new Error('User not found'));
    }
  }

  // New method to change the user's password
  changePassword(email: string, newPassword: string): Observable<any> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex > -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      return of({ success: true, message: 'Password changed successfully' }).pipe(delay(500));
    } else {
      return throwError(() => new Error('User not found'));
    }
  }
}
