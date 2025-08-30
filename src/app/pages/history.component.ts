import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SidebarComponent],
  template: `
    <div class="layout" [class.sidebar-closed]="isSidebarClosed">
      <!-- Sidebar -->
      <app-sidebar (sidebarToggle)="onSidebarToggle($event)"></app-sidebar>

      <!-- Main Content -->
      <div class="content">
        <h1 class="page-title">Activity History</h1>
        <p class="quote">Track all your recent actions and activities</p>

        <div class="card">
          <!-- Loading State -->
          <p *ngIf="loading" class="loading">Loading activities...</p>

          <!-- Error State -->
          <p *ngIf="error" class="error">{{ error }}</p>

          <!-- Activities List -->
          <div *ngIf="!loading && activities.length > 0">
            <h2 class="section-title">Recent Activities</h2>
            <ul class="activity-list">
              <li *ngFor="let activity of activities">
                <div class="activity-message">{{ activity.message }}</div>
                <div class="activity-time">{{ activity.time | date:'medium' }}</div>
              </li>
            </ul>
          </div>

          <!-- Empty State -->
          <p *ngIf="!loading && activities.length === 0" class="empty">No activities found</p>
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
      transition: padding 0.3s ease;
      min-width: 0;
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
      margin-bottom: 16px;
      color: #111827;
    }

    .activity-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .activity-list li {
      padding: 14px;
      margin-bottom: 12px;
      background: #f3f4f6;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.2s ease;
    }

    .activity-list li:hover {
      background: #e5e7eb;
    }

    .activity-message {
      font-size: 15px;
      font-weight: 500;
      color: #111827;
    }

    .activity-time {
      font-size: 13px;
      color: #6b7280;
    }

    .loading, .empty, .error {
      text-align: center;
      font-size: 14px;
      margin-top: 16px;
      color: #6b7280;
    }

    .error {
      color: #dc2626;
      font-weight: 600;
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
export class HistoryComponent implements OnInit {
  isSidebarClosed = false;
  activities: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.applyAutoClose();
    this.fetchActivities();
  }

  @HostListener('window:resize')
  onResize() {
    this.applyAutoClose();
  }

  applyAutoClose() {
    const shouldClose = window.innerWidth <= 992;
    if (this.isSidebarClosed !== shouldClose) {
      this.isSidebarClosed = shouldClose;
    }
  }

  onSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }

  fetchActivities() {
    this.http.get<any[]>('http://localhost:8080/api/activities')  // Replace with your backend API
      .subscribe({
        next: (data) => {
          this.activities = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load activities. Please try again.';
          this.loading = false;
        }
      });
  }
}