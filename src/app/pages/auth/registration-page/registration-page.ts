import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

// Custom validator function
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (!password || !confirmPassword) {
    return null;
  }
  
  const error = (password.value !== confirmPassword.value) ? { mismatch: true } : null;
  confirmPassword.setErrors(error); // Set the error on confirmPassword control
  return error; // Return group-level error
}

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration-page.html',
  styleUrls: ['./registration-page.css']
})
export class RegistrationPage implements OnInit {
  registerForm!: FormGroup;
  formError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      firstName: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      lastName: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      phone: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      password: this.fb.control('', {
        validators: [
          Validators.required,
          // Corrected regular expression
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,}).*$')
        ], nonNullable: true
      }),
      confirmPassword: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      role: this.fb.control('user', { validators: [Validators.required], nonNullable: true }), // Default to 'user'
    }, { validators: passwordsMatchValidator });
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.formError = true;
      return;
    }

    this.formError = false;
    const { confirmPassword, ...userData } = this.registerForm.value;
    this.authService.register(userData).subscribe(response => {
      if (response.success) {
        console.log('Registration successful:', response.message);
        this.router.navigate(['/login']);
      } else {
        console.error('Registration failed:', response.message);
      }
    });
  }
}