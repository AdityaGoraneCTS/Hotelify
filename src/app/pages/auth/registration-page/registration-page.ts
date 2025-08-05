import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

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
      password: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      confirmPassword: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      role: this.fb.control('', { nonNullable: true }),
    }, { validators: this.passwordsMatchValidator });
  }

  onSubmit(): void {
    this.validateForm();
    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value;
      this.authService.register(userData).subscribe(response => {
        if (response.success) {
          console.log('Registration successful:', response.message);
          this.router.navigate(['/login']); // Redirect to login page
        } else {
          console.error('Registration failed:', response.message);
          // Handle error, e.g., show a message to the user
        }
      });
    }
  }

  passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirmPassControl = form.get('confirmPassword');
    if (pass !== confirmPassControl?.value) {
      confirmPassControl?.setErrors({ mismatch: true });
    } else {
      confirmPassControl?.setErrors(null);
    }
    return null;
  }
  
  validateForm() {
    if (this.registerForm.invalid) {
      this.formError = true;
      this.registerForm.markAllAsTouched();
    } else {
      this.formError = false;
    }
  }
}