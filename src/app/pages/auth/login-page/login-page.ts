import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage {

   signInWithGoogle(): void {
    // TODO: Integrate Google Sign-In logic here
    console.log('Redirecting to Google OAuth...');
  }

  email: string = '';
  password: string = '';
  // Add other properties and methods as needed
}



