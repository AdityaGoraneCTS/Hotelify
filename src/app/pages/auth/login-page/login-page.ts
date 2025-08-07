import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      // You can add validation logic here to show an error message
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe(response => {
      if (response.success) {
        console.log('Login successful');
        this.router.navigate(['/']); // Redirect to homepage
      } else {
        console.error('Login failed:', response.message);
        // Display an error message to the user
      }
    });
  }

  // Method to handle forgot password redirection
  forgotPassword(): void {
    console.log('Redirecting to forgot password page...');
    this.router.navigate(['/forgot-password']);
  }

  // Method to handle Google sign-in redirection
  signInWithGoogle(): void {
    console.log('Redirecting to Google OAuth...');
    // This is where you would initiate the Google OAuth flow.
    // For now, we will simply redirect to a placeholder page.
    this.router.navigate(['/google-login']);
  }
}