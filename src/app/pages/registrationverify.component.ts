import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <section class="card">
    <div class="header">
      <h1>Verify OTP</h1>
      <p>Enter OTP to successfully complete account creation. 
         We have sent an OTP to your registered email.</p>
    </div>  

    <form (ngSubmit)="verify()" #f="ngForm">
      <div style="display:grid; gap:10px">
        <input class="input" name="otp" [(ngModel)]="otp" placeholder="Enter OTP" required />
        <button class="btn" type="submit">Verify OTP</button>
      </div>
    </form>

    <!-- ✅ Success and error messages -->
    <div *ngIf="success" class="success">{{success}}</div>
    <div *ngIf="error" class="error">{{error}}</div>
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
    .btn { width:100%; padding:14px; border-radius:12px; border:none; cursor:pointer; background:darkblue; color:#fff; font-weight:600; font-size:16px; margin-bottom:14px; }
    .btn:hover { background:linear-gradient(90deg,#4f46e5,#3730a3); }
    .error { color:#ef4444; font-size:14px; text-align:center; margin-top:10px; }
    .success { color:#10b981; font-size:14px; text-align:center; margin-top:10px; font-weight:600; }
    @media(max-width:480px){ .card{ max-width:90%; padding:20px; } .header h1{ font-size:24px; } }
  `]
})
export class RegistrationVerifyOtpComponent {
  otp = '';
  error = '';
  success = '';

  constructor(private http: HttpClient, private router: Router) {}

  verify() {
    this.error = '';
    this.success = '';
    this.http.post('http://localhost:8080/api/auth/verify-otp', { otp: this.otp }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token); // Save JWT
        this.success = '✅ OTP Verified Successfully!';
        // Redirect after 2 seconds
        setTimeout(() => this.router.navigateByUrl('/dashboard'), 2000);
      },
      error: err => this.error = err?.error?.message || 'OTP verification failed'
    });
  }
}
