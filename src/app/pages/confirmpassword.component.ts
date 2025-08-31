import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-reset',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <section class="card">
    <div class="header">
      <h1>Reset Password</h1>
      <p>Enter the OTP sent to your email and your new password.</p>
    </div>

    <!-- OTP + New Password Form -->
    <form (ngSubmit)="resetPassword()" #resetForm="ngForm" *ngIf="!success">
      <div style="display:grid; gap:10px">
        <input 
          class="input" 
          name="otp" 
          [(ngModel)]="otp" 
          type="text" 
          placeholder="Enter OTP" 
          required />

        <input 
          class="input" 
          name="newPassword" 
          [(ngModel)]="newPassword" 
          type="password" 
          placeholder="Enter New Password" 
          required />

        <input 
          class="input" 
          name="confirmPassword" 
          [(ngModel)]="confirmPassword" 
          type="password" 
          placeholder="Confirm Password" 
          required />

        <button class="btn" type="submit">Update Password</button>
      </div>
    </form>

    <!-- Success Message -->
    <div *ngIf="success" style="text-align:center;">
      <p style="color:green; font-weight:600;">✅ Password changed successfully!</p>
    </div>

    <button type="button" class="btn secondary" routerLink="/" 
      style="background:#0b1020;border:1px solid rgba(255,255,255,0.1)">
      Back to Sign In
    </button>

    <!-- Error Message -->
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
    .card { 
      background:#f9fafb; 
      border:1px solid rgba(0,0,0,0.08); 
      border-radius:20px; 
      padding:30px; 
      max-width:400px; 
      width:100%; 
      box-shadow:0 4px 20px rgba(0,0,0,0.08);
    }
    .header { text-align:center; margin-bottom:20px; }
    .header h1 { font-size:32px; font-weight:700; }
    .header p { color:#6b7280; font-size:14px; }
    .input { width:92%; padding:14px; margin-bottom:16px; border-radius:12px; border:1px solid rgba(0,0,0,0.12); font-size:16px; }
    .input:focus { border:1px solid #4f46e5; outline:none; }
    .btn { width:100%; padding:14px; border-radius:12px; border:none; cursor:pointer; background:darkblue; color:#fff; font-weight:600; font-size:16px; margin-bottom:14px; }
    .btn:hover { background:linear-gradient(90deg,#4f46e5,#3730a3); }
    .error { color:#ef4444; font-size:14px; text-align:center; }
    @media(max-width:480px){ .card{ max-width:90%; padding:20px; } .header h1{ font-size:24px; } }
  `]
})
export class ConfirmPasswordComponent {
  otp = '';
  newPassword = '';
  confirmPassword = '';
  error = '';
  success = false;
  email: string | null = '';

  constructor(private http: HttpClient, private router: Router) {
    this.email = localStorage.getItem('resetEmail'); // ✅ email from forgot password
  }

  resetPassword() {
    if (!this.otp.trim() || !this.newPassword || !this.confirmPassword) {
      this.error = 'All fields are required';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.error = '';
    
    this.http.post('http://localhost:8080/api/user-utils/reset', {
      email: this.email,
      otp: this.otp,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => this.router.navigateByUrl('/'), 2000);
      },
      error: err => this.error = err?.error?.message || 'Failed to reset password'
    });
  }
}
