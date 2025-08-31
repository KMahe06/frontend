import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    <!-- Sidebar -->
    <app-sidebar (sidebarToggle)="onSidebarToggle($event)"></app-sidebar>

    <!-- Content -->
    <div class="content">
      <h1 class="page-title">Share File</h1>
      <p class="quote">Securely share your file with others</p>

      <div class="card">
        <!-- File Info -->
        <p *ngIf="fileId" class="file-info">
          Sharing file with ID: <strong>{{ fileId }}</strong>
        </p>

        <!-- Username -->
        <div class="field">
          <label class="label">Enter Username</label>
          <input
            type="text"
            [(ngModel)]="username"
            placeholder="Enter username to share with" />
        </div>

        <!-- Sensitivity Options -->
        <div class="field">
          <label class="label">Select Data Sensitivity</label>
          <div class="radio-group">
            <label>
              <input type="radio" [(ngModel)]="sensitivity" value="sensitive" />
              Sensitive Data
            </label>
            <label>
              <input type="radio" [(ngModel)]="sensitivity" value="insensitive" />
              Insensitive Data
            </label>
          </div>
        </div>

        <!-- Submit -->
        <button class="btn" (click)="shareFile()">Share File</button>

        <!-- Messages -->
        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
      background: #f9fafb;
      font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      transition: all 0.3s ease;
    }
    app-sidebar {
      flex: 0 0 240px;
      transition: flex-basis 0.3s ease, width 0.3s ease;
    }
    .layout.sidebar-closed app-sidebar {
      flex: 0 0 0;
      width: 0;
      overflow: visible;
    }
    .content {
      flex: 1;
      padding: 40px;
      background: #f9fafb;
      min-width: 0;
      transition: padding 0.3s ease;
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
      max-width: 600px;
      margin: 0 auto;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(0,0,0,0.12);
    }
    .field { margin-bottom: 16px; }
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
    .radio-group {
      display: flex;
      gap: 20px;
      margin-top: 6px;
    }
    .radio-group label {
      font-size: 14px;
      color: #374151;
      cursor: pointer;
    }
    .btn {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: none;
      background: #1e3a8a;
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
    .success {
      color: #16a34a;
      font-weight: 600;
      text-align: center;
      margin-top: 12px;
    }
    .error {
      color: #dc2626;
      font-weight: 600;
      text-align: center;
      margin-top: 12px;
    }
    .file-info {
      font-size: 14px;
      color: #374151;
      margin-bottom: 16px;
      text-align: center;
    }
    @media (max-width: 992px) {
      .content { padding: 24px; }
      .page-title { font-size: 28px; }
    }
    @media (max-width: 768px) {
      .content { padding: 16px; }
      .page-title { font-size: 24px; }
      .card { padding: 18px; }
    }
    @media (max-width: 480px) {
      .page-title { font-size: 20px; }
    }
  `]
})
export class SensitivityComponent implements OnInit {
  isSidebarClosed = false;
  fileId: string | null = null;
  username = '';
  sensitivity = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.applyAutoClose();
    this.fileId = this.route.snapshot.paramMap.get('id'); // <-- fetch fileId from route
  }

  @HostListener('window:resize')
  onResize() { this.applyAutoClose(); }

  applyAutoClose() {
    const shouldClose = window.innerWidth <= 992;
    if (this.isSidebarClosed !== shouldClose) this.isSidebarClosed = shouldClose;
  }

  onSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }

  shareFile() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.fileId) {
      this.errorMessage = 'File ID is missing!';
      return;
    }
    if (!this.username) {
      this.errorMessage = 'Please enter a username';
      return;
    }
    if (!this.sensitivity) {
      this.errorMessage = 'Please select sensitivity';
      return;
    }

    this.http.post<{ success: boolean; message?: string }>(
      'http://localhost:8080/api/shared-files/share',
      { fileId: this.fileId, recipientUsername: this.username, isSensitive: this.sensitivity }
    ).subscribe({
      next: (res) => {
        if (res?.success) {
          this.successMessage = res.message || 'File shared successfully ✅';
          this.username = '';
          this.sensitivity = '';
        } else {
          this.errorMessage = res?.message || 'Failed to share file';
        }
      },
      error: () => {
        this.errorMessage = 'Error while sharing file. Please try again.';
      }
    });
  }
}
