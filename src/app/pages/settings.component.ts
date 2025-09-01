import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent, RouterModule],
  template: `
    <div class="layout">
      <!-- Sidebar -->
      <app-sidebar (sidebarToggle)="isSidebarClosed = $event"></app-sidebar>

      <!-- Main Content -->
      <div class="content" [class.full]="isSidebarClosed">
        <h1 class="page-title">Settings</h1>
        <p class="quote">"Manage your profile, contacts, and account settings."</p>

        <!-- About -->
        <div class="card">
          <button class="card-header" (click)="toggle('about')">
            <span>About</span>
            <span class="chev" [class.open]="open.about">▾</span>
          </button>
          <div class="card-body" *ngIf="open.about">
            <ng-container *ngIf="!loading.user; else userLoading">
              <div class="row">
                <span class="lbl">Username</span><span class="val">{{ user?.username }}</span>
              </div>
              <div class="row">
                <span class="lbl">Email</span><span class="val">{{ user?.email }}</span>
              </div>
            </ng-container>
            <ng-template #userLoading><div class="muted">Loading user…</div></ng-template>
          </div>
        </div>

        <!-- Contact -->
        <div class="card">
          <button class="card-header" (click)="toggle('contact')">
            <span>Contact (Helpline)</span>
            <span class="chev" [class.open]="open.contact">▾</span>
          </button>
          <div class="card-body" *ngIf="open.contact">
            <ng-container *ngIf="!loading.contact; else contactLoading">
              <div class="row">
                <span class="lbl">Helpline</span><span class="val phone">{{ helpline }}</span>
              </div>
            </ng-container>
            <ng-template #contactLoading><div class="muted">Fetching contact…</div></ng-template>
          </div>
        </div>
        <!-- Delete Account -->
        <div class="card danger">
          <button class="card-header" (click)="toggle('delete')">
            <span>Delete Account</span>
            <span class="chev" [class.open]="open.delete">▾</span>
          </button>
          <div class="card-body" *ngIf="open.delete">
            <p class="muted">
              Deleting your account removes your profile, email, and
              <b>all files you have uploaded</b>. This cannot be undone.
            </p>

            <label class="confirm">
              <input type="checkbox" [(ngModel)]="confirmDelete" />
              I understand this action is permanent.
            </label>

            <div class="id-row">
              <label>
                Confirm Username:

                <input
                  class="id-input"
                  [(ngModel)]="targetUsername"
                  placeholder="Type your username"
                />
              </label>
            </div>
            <br />
            <!-- OTP Section -->
            <div class="otp-section">
              <label>
                Enter OTP:

                <input class="otp-input" [(ngModel)]="otp" maxlength="6" placeholder="Enter OTP" />
              </label>
              <div class="otp-buttons">
                <button class="btn btn-secondary" (click)="requestOtp()" [disabled]="busy.otp">
                  {{ busy.otp ? 'Sending…' : 'Request OTP' }}
                </button>
                <button class="btn btn-primary" (click)="verifyOtp()" [disabled]="busy.verify">
                  {{ busy.verify ? 'Verifying…' : 'Verify OTP' }}
                </button>
              </div>
              <div class="ok" *ngIf="otpVerified">✅ OTP verified successfully</div>
              <div class="warn" *ngIf="otpError">⚠ {{ otpError }}</div>
            </div>

            <button
              class="btn btn-danger"
              [disabled]="!confirmDelete || busy.delete || !otpVerified"
              (click)="onDeleteAccount()"
            >
              {{ busy.delete ? 'Deleting…' : 'Delete My Account' }}
            </button>

            <div class="warn" *ngIf="violation">
              ⚠ You are violating the rule: you attempted to delete <b>another user’s</b> account.
            </div>

            <div class="ok" *ngIf="deleteOk">
              ✅ Account and uploaded files deleted. You will be logged out.
            </div>
          </div>
        </div>

        <!-- Logout -->
        <div class="card">
          <button class="card-header" (click)="toggle('logout')">
            <span>Logout</span>
            <span class="chev" [class.open]="open.logout">▾</span>
          </button>
          <div class="card-body" *ngIf="open.logout">
            <p class="muted">End your session and return to the login screen.</p>
            <button class="btn btn-primary" [disabled]="busy.logout" (click)="onLogout()">
              {{ busy.logout ? 'Logging out…' : 'Logout' }}
            </button>
            <div class="ok" *ngIf="logoutOk">✅ Logged out successfully.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .layout {
        display: flex;
        min-height: 100vh;
        background: #f9fafb;
        font-family: 'Inter', system-ui, sans-serif;
      }

      /* Content shifts when sidebar is open/closed */
      .content {
        flex: 1;
        padding: 40px;
        overflow-y: auto;
        transition: margin-left 0.3s ease;
        margin-left: 250px; /* default when sidebar is visible */
      }

      .content.full {
        margin-left: 0; /* take full width when sidebar closed */
      }
      /* Common styling for inputs */
      .id-input,
      .otp-input {
        width: 250px;
        padding: 10px 14px;
        font-size: 15px;
        border: 2px solid #1e3a8a; /* Dark blue border */
        border-radius: 8px;
        outline: none;
        background: #f9fafb;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
      }

      /* Hover effect */
      .id-input:hover,
      .otp-input:hover {
        border-color: #2563eb; /* lighter blue */
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transform: scale(1.02);
      }

      /* Focus effect */
      .id-input:focus,
      .otp-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 6px 14px rgba(59, 130, 246, 0.4);
        transform: scale(1.03);
      }

      /* Label spacing */
      .id-row label,
      .otp-section label {
        font-weight: 500;
        color: #1f2937;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .page-title {
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 8px;
      }
      .quote {
        font-size: 14px;
        color: #6b7280;
        text-align: center;
        margin-bottom: 24px;
      }

      /* Cards */
      .card {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        margin: 16px 0;
        border: 1px solid #eef1f5;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .card:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
      }
      .card.danger {
        border-color: #ffe0e0;
      }
      .card-header {
        width: 100%;
        text-align: left;
        background: #f7f9fc;
        border: 0;
        padding: 14px 18px;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
      }
      .card-header:hover {
        background: #f2f6fb;
      }
      .chev {
        transition: transform 0.2s ease;
      }
      .chev.open {
        transform: rotate(180deg);
      }
      .card-body {
        padding: 16px 18px 18px;
      }
      .row {
        display: flex;
        gap: 16px;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px dashed #e9edf3;
      }
      .row:last-child {
        border-bottom: 0;
      }
      .lbl {
        width: 140px;
        color: #5a6b87;
        font-weight: 600;
      }
      .val {
        color: #1f2a44;
      }
      .phone {
        font-family: monospace;
      }

      /* Buttons */
      .btn {
        padding: 10px 14px;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        transition: transform 0.2s ease, background 0.2s ease;
        margin-top: 8px;
      }
      .btn:hover {
        transform: translateY(-2px);
      }
      .btn-primary {
        background: #2d7bf0;
        color: #fff;
      }
      .btn-primary:hover {
        background: #206ae0;
      }
      .btn-danger {
        background: #291969ff;
        color: #fff;
      }
      .btn-danger:hover {
        background: #2f2664ff;
      }
      .btn-secondary {
        margin-right: 10px;
        background: #6b7280;
        color: #fff;
      }
      .btn-secondary:hover {
        background: #4b5563;
      }

      .muted {
        color: #6b7b92;
      }
      .ok,
      .warn {
        margin-top: 12px;
        padding: 10px 12px;
        border-radius: 10px;
      }
      .ok {
        background: #eef9f1;
        color: #196b39;
        border: 1px solid #c7efd5;
      }
      .warn {
        background: #fff4f4;
        color: #9c1f1f;
        border: 1px solid #ffd7d7;
      }

      /* Responsive */
      @media (max-width: 1023px) {
        .content {
          margin-left: 0 !important;
          padding: 20px;
        }
        .page-title {
          font-size: 24px;
        }
      }

      @media (max-width: 600px) {
        .content {
          padding: 15px;
        }
        .page-title {
          font-size: 20px;
        }
        .card-header {
          font-size: 14px;
          padding: 10px 14px;
        }
        .btn {
          width: 100%;
        }
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  isSidebarClosed = false;

  user: { username: string; email: string } | null = null;
  helpline = '';
  open = { about: false, contact: false, delete: false, logout: false };
  loading = { user: true, contact: true };
  busy = { delete: false, logout: false, otp: false, verify: false };

  confirmDelete = false;
  targetUsername = '';
  violation = false;
  deleteOk = false;
  logoutOk = false;

  otp = '';
  otpVerified = false;
  otpError: string | null = null;

  async ngOnInit() {
    this.http.get<{ username: string; email: string }>('/api/auth/user-utils/settings').subscribe({
      next: (res) => {
        this.user = res;
        this.loading.user = false;
      },
      error: () => {
        this.loading.user = false;
      },
    });
    this.http.get<{ contact: string }>('/api/contact').subscribe({
      next: (res) => {
        this.helpline = res.contact;
        this.loading.contact = false;
      },
      error: () => {
        this.loading.contact = false;
      },
    });
  }

  toggle(key: keyof typeof this.open) {
    this.open[key] = !this.open[key];
  }

  /* rest of requestOtp, verifyOtp, onDeleteAccount, onLogout same as yours */

  requestOtp() {
    this.busy.otp = true;
    this.http.post('/api/request-delete-otp', { username: this.user?.username }).subscribe({
      next: () => {
        this.busy.otp = false;
        alert('OTP sent to your registered email/phone');
      },
      error: () => {
        this.busy.otp = false;
        alert('Error sending OTP');
      },
    });
  }

  verifyOtp() {
    this.busy.verify = true;
    this.otpError = null;
    this.http
      .post<{ success: boolean; message?: string }>('/api/verify-delete-otp', { otp: this.otp })
      .subscribe({
        next: (res) => {
          this.busy.verify = false;
          if (res.success) {
            this.otpVerified = true;
          } else {
            this.otpError = res.message || 'Invalid OTP';
            this.otpVerified = false;
          }
        },
        error: () => {
          this.busy.verify = false;
          this.otpError = 'Error verifying OTP';
          this.otpVerified = false;
        },
      });
  }

  onDeleteAccount() {
    if (!this.user) return;
    if ((this.targetUsername || '').trim() !== this.user.username) {
      this.violation = true;
      this.deleteOk = false;
      return;
    }
    this.violation = false;
    if (!this.confirmDelete || !this.otpVerified) return;

    this.busy.delete = true;
    this.http.delete(`/api/user-utils/delete-account`).subscribe({
      next: () => {
        this.busy.delete = false;
        this.deleteOk = true;
        setTimeout(() => this.onLogout(), 800);
      },
      error: () => {
        this.busy.delete = false;
      },
    });
  }

  onLogout() {
    this.busy.logout = true;
    this.http.post('/api/auth/signout', {}).subscribe({
      next: () => {
        this.busy.logout = false;
        this.logoutOk = true;

        // Clear session/local storage to remove user data
        localStorage.removeItem('SecureShareJwtCookie');
        localStorage.removeItem('username');

        // Redirect to login page
        this.router.navigate(['/']);
      },
      error: () => {
        this.busy.logout = false;
      },
    });
  }
}
