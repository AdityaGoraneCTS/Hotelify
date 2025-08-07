// src/app/pages/profile/profile-page/profile-page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage implements OnInit {
  isEditMode = false;
  showPasswordForm = false;

  profile: any = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: ''
  };

  originalProfile: any;

  passwordForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.profile = { ...user };
        this.originalProfile = { ...user };
      } else {
        // Handle case where user is not logged in, e.g., redirect to login
        this.router.navigate(['/login']);
      }
    });
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    this.showPasswordForm = false;
    if (!this.isEditMode) {
      // Reset the profile data to the original state if the user cancels
      this.profile = { ...this.originalProfile };
    }
  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
    this.isEditMode = false;
    this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '' };
  }

  saveProfile(form: NgForm) {
    if (form.valid) {
      this.authService.updateProfile(this.profile).subscribe(
        response => {
          if (response.success) {
            this.originalProfile = { ...this.profile }; // Update original profile
            this.isEditMode = false;
            alert('Profile saved successfully!');
          } else {
            alert('Failed to save profile: ' + response.message);
          }
        },
        error => {
          alert('An error occurred while saving the profile.');
        }
      );
    } else {
      alert('Please correct the errors in the form.');
    }
  }

  changePassword() {
    const { oldPassword, newPassword, confirmPassword } = this.passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('All password fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    // Check if old password is correct
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUserWithPassword = allUsers.find((u: User) => u.email === this.profile.email);

    if (currentUserWithPassword && currentUserWithPassword.password !== oldPassword) {
      alert('Old password is incorrect.');
      return;
    }

    this.authService.changePassword(this.profile.email, newPassword).subscribe(
      response => {
        if (response.success) {
          alert('Password changed successfully!');
          this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '' };
          this.showPasswordForm = false;
        } else {
          alert('Failed to change password: ' + response.message);
        }
      },
      error => {
        alert('An error occurred while changing the password.');
      }
    );
  }
}