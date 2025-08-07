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
  
  // Set the error on confirmPassword control if they don't match
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mismatch: true });
    // This is important: return a group-level error
    return { mismatch: true }; 
  } else {
    // If they match, clear the error
    confirmPassword.setErrors(null);
    return null;
  }
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
      // Updated password pattern to be simpler
      password: this.fb.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
      confirmPassword: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      role: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
    }, { validators: passwordsMatchValidator }); // Use the custom validator here
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.formError = true;
      this.registerForm.markAllAsTouched();
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