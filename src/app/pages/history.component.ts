import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

interface AuditLogResponse {
  username: string;
  action: string;
  filename?: string;
  timestamp: string;
}

interface AuditLogsResponse {
  auditLogList: AuditLogResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}

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

          <!-- Only show content when not loading -->
          <div *ngIf="!loading">
            <!-- Activities List -->
            <div *ngIf="activities.length > 0; else emptyState">
              <h2 class="section-title">Recent Activities</h2>
              <ul class="activity-list">
                <li *ngFor="let activity of activities" class="activity-item">
                  <div class="activity-left">
                    <div class="activity-user">{{ activity.username }}</div>
                    <div class="activity-action">
                      {{ activity.action }}
                      <span *ngIf="activity.filename">: {{ activity.filename }}</span>
                    </div>
                  </div>
                  <div class="activity-time">{{ activity.timestamp | date : 'medium' }}</div>
                </li>
              </ul>
            </div>

            <!-- Empty State -->
            <ng-template #emptyState>
              <p class="empty">No activities found</p>
            </ng-template>

            <!-- Pagination -->
            <div class="pagination">
              <button (click)="prevPage()" [disabled]="pageNumber === 0">Prev</button>
              <span>Page {{ pageNumber + 1 }} of {{ totalPages }}</span>
              <button (click)="nextPage()" [disabled]="lastPage">Next</button>
            </div>
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
        background: #ffffffff;
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
        background: #ffffffff;
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
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .card:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
        transform: scale(1.05);
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

      .activity-item {
        padding: 16px;
        margin-bottom: 12px;
        background: #f3f4f6;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.25s ease-in-out;
        transform: scale(1);
      }

      .activity-item:hover {
        background: #e5e7eb;
        transform: scale(1.02);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
      }

      .activity-left {
        display: flex;
        flex-direction: column;
      }

      .activity-user {
        font-size: 15px;
        font-weight: 600;
        color: #1d4ed8;
      }

      .activity-action {
        font-size: 14px;
        color: #111827;
        margin-top: 2px;
      }

      .activity-time {
        font-size: 13px;
        color: #6b7280;
      }

      .loading,
      .empty,
      .error {
        text-align: center;
        font-size: 14px;
        margin-top: 16px;
        color: #6b7280;
      }

      .error {
        color: #dc2626;
        font-weight: 600;
      }

      .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
      }
      .pagination button {
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        background: #2563eb;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .pagination button[disabled] {
        background: #9ca3af;
        cursor: not-allowed;
      }

      @media (max-width: 992px) {
        .content {
          padding: 24px;
        }
        .page-title {
          font-size: 28px;
        }
      }

      @media (max-width: 768px) {
        .content {
          padding: 16px;
        }
        .page-title {
          font-size: 24px;
        }
        .card {
          padding: 18px;
        }
      }

      @media (max-width: 480px) {
        .page-title {
          font-size: 20px;
        }
      }
    `,
  ],
})
export class HistoryComponent implements OnInit {
  isSidebarClosed = false;
  activities: AuditLogResponse[] = [];
  loading = true;
  error = '';

  // ✅ frontend uses 0-based indexing
  pageNumber = 0;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  lastPage = false;

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
    this.loading = true;
    this.http
      .get<AuditLogsResponse>(
        `http://localhost:8080/api/auth/logs/my-logs?pageNumber=${this.pageNumber + 1}&pageSize=${
          this.pageSize
        }`,
        { withCredentials: true }
      )
      .subscribe({
        next: (response) => {
          this.activities = response.auditLogList;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.lastPage = response.lastPage;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load activities. Please try again.';
          this.loading = false;
        },
      });
  }

  nextPage() {
    if (!this.lastPage) {
      this.pageNumber++;
      this.fetchActivities();
    }
  }

  prevPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.fetchActivities();
    }
  }
}
