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

  signInWithGoogle(): void {
    console.log('Redirecting to Google OAuth...');
  }
}