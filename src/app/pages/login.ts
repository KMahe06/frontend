import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <section class="card">
    <div class="header">
      <h1>Welcome back</h1>
      <p>Sign in to your account</p>
    </div>

    <form (ngSubmit)="submit()" #f="ngForm">
      <div style="display:grid; gap:10px;margin-top:8px">
        <!-- ✅ changed from email → username -->
        <input class="input" name="username" [(ngModel)]="username" type="text" placeholder="Username" required />
        <input class="input" name="password" [(ngModel)]="password" type="password" placeholder="Password" required />
        <button class="btn" type="submit">Sign In</button>

        <!-- Forgot links inline -->
        <div class="forgot-links">
          <a routerLink="/forgot-password">Forgot Password?</a>
          <span>|</span>
          <a routerLink="/forgot-username">Forgot Username?</a>
        </div>
      </div>
    </form>

    <div class="footer small" style="margin-top:12px">
      No account? <a routerLink="/register">Create one</a>
    </div>
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
    .error { color:#ef4444; font-size:14px; text-align:center; }

    /* Inline Forgot Links */
    .forgot-links {
      display:flex;
      justify-content:center;
      gap:10px;
      font-size:14px;
      margin-top:5px;
    }
    .forgot-links a {
      color:#4f46e5;
      text-decoration:none;
    }
    .forgot-links a:hover {
      text-decoration:underline;
    }

    @media(max-width:480px){
      .card{ max-width:90%; padding:20px; }
      .header h1{ font-size:24px; }
    }
  `]
})
export class LoginComponent {
  username = '';   // ✅ changed from email
  password = '';
  error = '';
 

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  // Using AuthService
  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe((res: any) => {
      if (res?.token) {
        this.authService.setToken(res.token); // store token in cookie
      }
    });
  }

  // Direct API call
  submit() {
    this.error = '';
    localStorage.setItem('username', this.username);
    this.http.post('http://localhost:8080/api/auth/signin', {
      username: this.username,   // ✅ changed
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/verify-otp');
      },
      error: (err: any) => this.error = err?.error?.message || 'Login failed'
    });
  }
}
