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

    <form (ngSubmit)="submit()" #f="ngForm">
      <div style="display:grid; gap:10px">
        <input class="input" name="name" [(ngModel)]="name" placeholder="Full name" required />
        <input class="input" name="email" [(ngModel)]="email" type="email" placeholder="Email" required />
        <input class="input" name="password" [(ngModel)]="password" type="password" placeholder="Password" required />
        <div class="helper">Password must be 8+ chars with upper, lower, digit & special character.</div>
        <button class="btn" type="submit">Create Account</button>
        <button type="button" class="btn secondary" routerLink="/" style="background:#0b1020;border:1px solid rgba(255,255,255,0.1)">Back to Sign In</button>
      </div>
    </form>

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
    .btn { width:100%; padding:14px; border-radius:12px; border:none; cursor:pointer; background:darkblue; color:#fff; font-weight:600; font-size:16px; margin-bottom:14px; }
    .btn:hover { background:linear-gradient(90deg,#4f46e5,#3730a3); }
    .btn.google { background:linear-gradient(90deg,#2628ad,#4f46e5); color:#fff; }
    .btn.microsoft { background:linear-gradient(90deg,#2628ad,#4f46e5); color:#fff; }
    .error { color:#ef4444; font-size:14px; text-align:center; }
    @media(max-width:480px){ .card{ max-width:90%; padding:20px; } .header h1{ font-size:24px; } }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  submit() {
    this.error = '';
    this.http.post('http://localhost:8080/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        // ✅ Navigate to OTP verification page after successful registration
        alert('Registration successful! Please verify OTP.');
        this.router.navigateByUrl('/registrationverify');
      },
      error: err => this.error = err?.error?.message || 'Registration failed'
    });
  }
}
