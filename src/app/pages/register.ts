import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <section class="card">
    <div class="header">
      <h1>Create account</h1>
      <p>Join ProAuth Suite in seconds</p>
    </div>

    <!-- Step 1: Email Input -->
    <div *ngIf="!otpVerified">
      <input class="input" name="email" [(ngModel)]="email" type="email" placeholder="Enter your Email" required />

      <!-- OTP Section (only visible after email is entered) -->
      <div *ngIf="email">
        <input class="input" name="otp" [(ngModel)]="otp" type="text" placeholder="Enter OTP" *ngIf="otpRequested" />

        <div style="display:flex; gap:10px; margin-bottom:16px">
          <button class="btn" (click)="generateOtp()" [disabled]="loading">Generate OTP</button>
          <button class="btn secondary" (click)="verifyOtp()" [disabled]="!otp">Verify OTP</button>
        </div>
      </div>
    </div>

    <!-- Step 2: After OTP Verified -->
    <form *ngIf="otpVerified" (ngSubmit)="createAccount()" #f="ngForm">
      <div style="display:grid; gap:10px">
        <input class="input" name="name" [(ngModel)]="name" placeholder="Full name" required />
        <input class="input" name="password" [(ngModel)]="password" type="password" placeholder="Password" required />
        <div class="helper">Password must be 8+ chars with upper, lower, digit & special character.</div>
        <button class="btn" type="submit" [disabled]="loading">Create Account</button>
      </div>
    </form>

    <!-- Error / Success messages -->
    <div *ngIf="message" class="info" style="margin-top:8px">{{message}}</div>
    <div *ngIf="error" class="error" style="margin-top:8px">{{error}}</div>
  </section>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
    :host {
      font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      width: 100%;
    }
    .card { background:#f9fafb; border:1px solid rgba(0,0,0,0.08); border-radius:20px; padding:30px; max-width:400px; width:100%; box-shadow:0 4px 20px rgba(0,0,0,0.08)}
    .header { text-align:center; margin-bottom:20px; }
    .header h1 { font-size:32px; font-weight:700; }
    .header p { color:#6b7280; font-size:14px; }
    .input { width:92%; padding:14px; margin-bottom:16px; border-radius:12px; border:1px solid rgba(0,0,0,0.12); font-size:16px; }
    .input:focus { border:1px solid #4f46e5; outline:none; }
    .btn { flex:1; padding:14px; border-radius:12px; border:none; cursor:pointer; background:darkblue; color:#fff; font-weight:600; font-size:16px; margin-bottom:14px; }
    .btn:hover { background:linear-gradient(90deg,#4f46e5,#3730a3); }
    .btn.secondary { background:#0b1020; border:1px solid rgba(255,255,255,0.1); }
    .error { color:#ef4444; font-size:14px; text-align:center; }
    .info { color:#10b981; font-size:14px; text-align:center; }
    @media(max-width:480px){ .card{ max-width:90%; padding:20px; } .header h1{ font-size:24px; } }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  otp = '';
  otpRequested = false;
  otpVerified = false;
  loading = false;

  error = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  generateOtp() {
    this.error = '';
    this.message = '';
    if (!this.email) {
      this.error = 'Please enter a valid email';
      return;
    }
    this.loading = true;
    this.http.post('http://localhost:8080/api/auth/generate-otp', { email: this.email })
      .subscribe({
        next: () => {
          this.loading = false;
          this.otpRequested = true;
          this.message = 'OTP sent to your email.';
        },
        error: err => {
          this.loading = false;
          this.error = err?.error?.message || 'Failed to generate OTP';
        }
      });
  }

  verifyOtp() {
    this.error = '';
    this.message = '';
    if (!this.email || !this.otp) {
      this.error = 'Enter both email and OTP';
      return;
    }
    this.loading = true;
    this.http.post('http://localhost:8080/api/auth/verify-otp', { email: this.email, otp: this.otp })
      .subscribe({
        next: () => {
          this.loading = false;
          this.otpVerified = true;
          this.message = 'OTP verified successfully!';
          this.otpRequested = false;
        },
        error: err => {
          this.loading = false;
          this.error = err?.error?.message || 'OTP verification failed';
        }
      });
  }

  createAccount() {
    this.error = '';
    this.message = '';
    if (!this.name || !this.password) {
      this.error = 'Name and password are required';
      return;
    }
    this.loading = true;
    this.http.post('http://localhost:8080/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Account created successfully!';
        setTimeout(() => this.router.navigateByUrl('/dashboard'), 1500);
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Registration failed';
      }
    });
  }
}
