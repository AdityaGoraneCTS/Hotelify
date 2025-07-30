import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public authService: AuthService) {} // Make authService public to use in template

  ngOnInit(): void {
    // Optionally, you might want to trigger a check here if needed,
    // but the async pipe handles subscriptions nicely.
  }

  logout(): void {
    this.authService.logout();
    // Redirect to home or login page after logout
    // You might want to use Router service here:
    // this.router.navigate(['/auth/login']);
  }
}
