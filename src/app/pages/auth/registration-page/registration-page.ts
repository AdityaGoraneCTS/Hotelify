import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration-page.html',
  styleUrls: ['./registration-page.css']
})
export class RegistrationPage implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
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
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      // You can integrate with backend service here
    }
  }
  passwordsMatchValidator(form: FormGroup) {
  const pass = form.get('password')?.value;
  const confirmPass = form.get('confirmPassword');
  if (pass === confirmPass?.value) {
    confirmPass?.setErrors(null);
    return null;
  } else {
    confirmPass?.setErrors({ mismatch: true });
    return { mismatch: true };
  }
}
formError: boolean = false;

validateForm() {
  if (this.registerForm.invalid) {
    this.formError = true;
    this.registerForm.markAllAsTouched();
  } else {
    this.formError = false;
    // Proceed with registration logic
  }
}


}
