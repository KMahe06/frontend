import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-sensitivity',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent],

  template: `
  <div class="layout" [class.sidebar-closed]="isSidebarClosed">
    <!-- Sidebar (kept in DOM so its own hamburger remains usable) -->
    <app-sidebar (sidebarToggle)="onSidebarToggle($event)"></app-sidebar>

    <!-- Content -->
    <div class="content">
      <h1 class="page-title">Choose Your Sensitivity</h1>
      <p class="quote">Select how you want to share your data</p>

      <div class="card">
        <!-- Search box -->
        <div class="field">
          <label class="label">Search Files</label>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (keyup.enter)="searchFiles()"
            placeholder="Search files..." />
        </div>

        <!-- Files list -->
        <div *ngIf="files.length > 0" class="files">
          <h3 class="section-title">Available Files</h3>
          <ul>
            <li *ngFor="let file of files"
                (click)="selectFile(file)"
                [class.active]="selectedFile === file">
              {{ file.name }}
            </li>
          </ul>
        </div>

        <!-- Sensitivity options -->
        <div class="actions">
          <button class="btn" (click)="chooseSensitive()">Sensitive Data</button>
          <button class="btn" (click)="chooseInsensitive()">Insensitive Data</button>
        </div>

        <!-- Sensitive Data Flow -->
        <div *ngIf="sensitivity === 'sensitive'" class="field">
          <label class="label">Enter OTP</label>
          <input type="text" [(ngModel)]="otp" placeholder="Enter OTP here" />
          <button class="btn" (click)="verifyOtp()">Verify & Share</button>
        </div>

        <!-- Insensitive Data Flow -->
        <div *ngIf="sensitivity === 'insensitive'" class="field">
          <label class="label">Enter Username</label>
          <input type="text" [(ngModel)]="username" placeholder="Enter username to share with" />
          <button class="btn" (click)="shareInsensitive()">Share File</button>
        </div>

        <!-- Success Message -->
        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
      </div>
    </div>
  </div>
  `,

  styles: [`
    /* ========== Layout ========== */
    .layout {
      display: flex;
      min-height: 100vh;
      background: #f9fafb;
      font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      transition: all 0.3s ease;
    }

    /* Reserve space for sidebar only when it's open */
    app-sidebar {
      flex: 0 0 240px;
      transition: flex-basis 0.3s ease, width 0.3s ease;
    }

    /* When sidebar is closed, free the full width for content,
       but keep <app-sidebar> in DOM so its internal hamburger is visible */
    .layout.sidebar-closed app-sidebar {
      flex: 0 0 0;
      width: 0;
      overflow: visible; /* allow the sidebar's fixed hamburger to be clickable */
    }

    /* ========== Content ========== */
    .content {
      flex: 1;
      padding: 40px;
      background: #f9fafb;
      transition: padding 0.3s ease;
      min-width: 0; /* prevents overflow on narrow screens */
    }

    .page-title {
      font-size: 32px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 8px;
      color: #111827;
    }

    .quote {
      font-size: 14px;
      color: #6b7280;
      text-align: center;
      margin-bottom: 24px;
    }

    .card {
      background: #fff;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(0,0,0,0.12);
    }

    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin: 16px 0 10px;
      color: #111827;
    }

    .field {
      margin-bottom: 16px;
    }

    .label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 6px;
    }

    input[type="text"] {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #d1d5db;
      font-size: 14px;
      background-color: #fff;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    input[type="text"]:focus {
      border-color: #2563eb;
      outline: none;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
    }

    .files ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .files li {
      padding: 10px 12px;
      margin-bottom: 8px;
      background: #f3f4f6;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .files li:hover {
      background: #e5e7eb;
    }
    .files li.active {
      background: #e0f2fe;
      color: #2563eb;
      font-weight: 600;
    }

    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin: 10px 0 4px;
      justify-content: center;
    }

    .btn {
      flex: 1;
      min-width: 180px;
      padding: 12px;
      border-radius: 10px;
      border: none;
      background: #1e3a8a; /* dark blue */
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.25s ease, transform 0.25s ease;
    }
    .btn:hover {
      background: #1d4ed8;
      transform: translateY(-1px);
    }
    .btn:disabled {
      background: #a5b4fc;
      cursor: not-allowed;
    }

    .success {
      color: #16a34a;
      font-weight: 600;
      text-align: center;
      margin-top: 12px;
    }

    /* ========== Responsive ========== */
    @media (max-width: 1200px) {
      .card { max-width: 90%; }
    }

    @media (max-width: 992px) {
      .content { padding: 24px; }
      .page-title { font-size: 28px; }
      /* Auto-close sidebar on tablets/smaller (parent class set in TS) */
    }

    @media (max-width: 768px) {
      .content { padding: 16px; }
      .page-title { font-size: 24px; }
      .card { padding: 18px; }
      .btn { min-width: 140px; }
    }

    @media (max-width: 480px) {
      .page-title { font-size: 20px; }
      .btn { min-width: 100%; }
    }
  `]
})
export class SensitivityComponent {
  // Sidebar state received from <app-sidebar>
  isSidebarClosed = false;

  searchQuery = '';
  files: any[] = [];
  selectedFile: any = null;
  sensitivity = '';
  otp = '';
  username = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  /* Keep parent and child in sync:
     - Sidebar emits its state via (sidebarToggle)
     - Parent also auto-closes on small screens */
  ngOnInit() {
    this.applyAutoClose();
  }

  @HostListener('window:resize')
  onResize() {
    this.applyAutoClose();
  }

  private applyAutoClose() {
    // Auto close on small screens; leave opening/closing to sidebar's hamburger
    const shouldClose = window.innerWidth <= 992;
    // Only update if changed, to avoid flicker
    if (this.isSidebarClosed !== shouldClose) {
      this.isSidebarClosed = shouldClose;
    }
  }

  onSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }

  // Backend interactions
  searchFiles() {
    this.http.get<any[]>(`/api/files?search=${encodeURIComponent(this.searchQuery || '')}`)
      .subscribe(res => { this.files = res || []; });
  }

  selectFile(file: any) {
    this.selectedFile = file;
    this.successMessage = '';
  }

  chooseSensitive() {
    if (!this.selectedFile) {
      alert('Please select a file first');
      return;
    }
    this.sensitivity = 'sensitive';
  }

  chooseInsensitive() {
    if (!this.selectedFile) {
      alert('Please select a file first');
      return;
    }
    this.sensitivity = 'insensitive';
  }

  verifyOtp() {
    if (!this.otp) {
      alert('Please enter the OTP');
      return;
    }
    this.http.post<{ success: boolean; message?: string }>(
      '/verify-otp',
      { otp: this.otp, file: this.selectedFile }
    ).subscribe({
      next: (res) => {
        if (res?.success) {
          this.successMessage = `OTP verified successfully. File "${this.selectedFile.name}" shared securely.`;
          this.sensitivity = '';
          this.otp = '';
        } else {
          alert(res?.message || 'OTP verification failed. Please try again.');
        }
      },
      error: () => alert('Error verifying OTP. Please try again.')
    });
  }

  shareInsensitive() {
    if (!this.username) {
      alert('Please enter a username');
      return;
    }
    this.http.post('/api/share', {
      file: this.selectedFile,
      username: this.username
    }).subscribe(() => {
      this.successMessage = `File shared successfully with ${this.username}`;
      this.sensitivity = '';
      this.username = '';
    });
  }
}
