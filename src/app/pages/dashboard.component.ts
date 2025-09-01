import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { SidebarComponent } from './sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface FetchFileResponse {
  id: number;
  filename: string;
  description: string;
  category: string;
  customCategory?: string;
  createdAt: string;   // ✅ actual field from backend
}

interface FetchFilesResponse {
  fetchFiles: FetchFileResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, SidebarComponent, HttpClientModule],
  template: `
    <div class="layout" [class.sidebar-closed]="isSidebarClosed">
      <!-- Hamburger (only if sidebar is closed) -->
      <button class="hamburger" *ngIf="isSidebarClosed" (click)="toggleSidebar()">
        <span></span><span></span><span></span>
      </button>

      <!-- Sidebar -->
      <app-sidebar (sidebarToggle)="onSidebarToggle($event)"></app-sidebar>

      <!-- Main Content -->
      <div class="content">
        <h1 class="page-title">Dashboard</h1>
        <p class="quote">"Overview of your uploads and stats"</p>

        <div class="dashboard">

          <!-- Row 1 -->
          <div class="row">
            <div class="card flex-2">
              <h3>📈 Uploads Summary</h3>
              <canvas baseChart [data]="lineChartData" [options]="lineChartOptions" [type]="'line'"></canvas>
            </div>
            <div class="card flex-1">
              <h3>📂 Category Distribution</h3>
              <canvas baseChart [data]="doughnutChartData" [options]="doughnutChartOptions" [type]="'doughnut'"></canvas>
              <div class="category-grid">
                <div class="category-item" *ngFor="let cat of categoryStats; let i=index">
                  <span class="category-color" [style.background]="chartColors[i]"></span>
                  <span>{{cat.label}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="row">
            <div class="card flex-1">
              <h3>📑 Recent Uploads</h3>
              <table>
                <thead>
                  <tr><th>File</th><th>Category</th><th>Date</th></tr>
                </thead>
                <tbody>
                  <tr *ngFor="let file of recentUploads">
                    <td>{{trimFilename(file.name)}}</td>
                    <td>{{file.category}}</td>
                    <td>{{file.date}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card flex-1">
              <h3>📊 Uploads by Category</h3>
              <canvas baseChart [data]="barChartData" [options]="barChartOptions" [type]="'bar'"></canvas>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="row">
            <div class="card flex-2">
              <h3>🔵 Circular Stats</h3>
              <div class="circle-row">
                <div class="circle-card" *ngFor="let cat of categoryStats">
                  <div class="circle">{{cat.value}}</div>
                  <p>{{cat.label}}</p>
                </div>
              </div>
            </div>
            <div class="card flex-1">
              <h3>🔥 Most Uploaded Trend</h3>
              <canvas baseChart [data]="miniLineChartData" [options]="miniLineChartOptions" [type]="'line'"></canvas>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Layout */
    .layout { display: flex; min-height: 100vh; width: 100%; font-family: 'Inter', sans-serif; }
    app-sidebar { width: 240px; flex-shrink: 0; transition: all 0.3s ease; }
    .layout.sidebar-closed app-sidebar { display: none; }
    .content { flex: 1; padding: 30px; background: #eeeff2ff; transition: all 0.3s ease; }
    .page-title { text-align: center; font-size: 30px; font-weight: 700; margin-bottom: 5px; }
    .quote { text-align: center; color: #6b7280; margin-bottom: 20px; }

    /* Hamburger */
    .hamburger {
      position: fixed; top: 20px; left: 20px; width: 25px; height: 20px;
      background: transparent; border: none; display: flex; flex-direction: column;
      justify-content: space-between; cursor: pointer; z-index: 1000;
    }
    .hamburger span { display: block; height: 4px; width: 100%; background: #000; border-radius: 2px; }

    /* Dashboard Cards */
    .dashboard { }
    .row { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
    .card { background: #1e293b; border-radius: 16px; padding: 16px;
            flex: 1; box-shadow: 0 6px 16px rgba(0,0,0,0.4); transition: 0.3s; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
    .flex-2 { flex: 2; } .flex-1 { flex: 1; }
    h3 { margin-bottom: 12px; font-weight: 600; color: #f1f5f9; display: flex; align-items: center; gap: 6px; }

    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #334155;color:white }
    th { color: #ffffffff; font-weight: 500; }

    /* Category Grid */
    .category-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 12px; }
    .category-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #f9fafb; }
    .category-color { width: 16px; height: 16px; border-radius: 3px; display: inline-block; }

    /* Circles */
    .circle-row { display: flex; flex-wrap: wrap; gap: 12px; }
    .circle-card { text-align: center; flex: 1 1 calc(12.5% - 12px); min-width: 80px; }
    .circle { width: 60px; height: 60px; border-radius: 50%; background: #3b82f6; color: #fff;
              display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; margin: auto; }
    .circle-card p { margin-top: 6px; font-size: 14px; color: #cbd5e1; }

    /* Responsive */
    @media(max-width: 1024px) {
      .row { flex-direction: column; }
      .category-grid { grid-template-columns: repeat(2, 1fr); }
      .circle-card { flex: 1 1 calc(25% - 12px); }
    }
    @media(max-width: 768px) {
      .content { padding: 15px; }
      .page-title { font-size: 24px; }
      .category-grid { grid-template-columns: 1fr; }
      .circle-card { flex: 1 1 calc(50% - 12px); }
    }
    @media(max-width: 480px) {
      .circle-card { flex: 1 1 100%; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  isSidebarClosed = false;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  recentUploads: { name: string; category: string; date: string }[] = [];
  categoryStats: { label: string; value: number }[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { labels: { color: '#f9fafb' } } },
    scales: { x: { ticks: { color: '#94a3b8' } }, y: { ticks: { color: '#94a3b8' } } }
  };

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
  public doughnutChartOptions: ChartOptions<'doughnut'> = { responsive: true, plugins: { legend: { display: false } } };

  public barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [{ label: 'Files', data: [], backgroundColor: '#3b82f6' }] };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { labels: { color: '#f9fafb' } } },
    scales: { x: { ticks: { color: '#94a3b8' } }, y: { ticks: { color: '#94a3b8' } } }
  };

  public miniLineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public miniLineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { ticks: { color: '#94a3b8' } }, y: { ticks: { color: '#94a3b8' } } }
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkScreenSize();
    this.fetchDashboardData();
  }

  @HostListener('window:resize') onResize() { this.checkScreenSize(); }
  checkScreenSize() { this.isSidebarClosed = window.innerWidth <= 992; }
  onSidebarToggle(state: boolean) { this.isSidebarClosed = state; }
  toggleSidebar() { if (this.sidebar) this.sidebar.toggleSidebar(); }

  // ✅ Fetch data from backend
  fetchDashboardData() {
    this.http.get<FetchFilesResponse>('http://localhost:8080/api/files/fetch-all', { withCredentials: true }).subscribe({
      next: (res) => {
        const files = res.fetchFiles || [];

        // 📑 Recent Uploads (latest 5)
        this.recentUploads = [...files]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
          .map(f => ({
            name: f.filename,
            category: f.category === 'other' ? f.customCategory || 'Other' : f.category,
            date: new Date(f.createdAt).toLocaleDateString()
          }));

        // 📂 Category Stats
        const categoryMap: Record<string, number> = {};
        files.forEach(f => {
          const cat = f.category === 'other' ? f.customCategory || 'Other' : f.category;
          categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });
        this.categoryStats = Object.keys(categoryMap).map(k => ({ label: k, value: categoryMap[k] }));

        // 📈 Uploads Summary (last 12 days)
        const last12Days: string[] = [];
        const today = new Date();
        for (let i = 11; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          last12Days.push(d.toISOString().split('T')[0]); // yyyy-MM-dd
        }
        const uploadsByDay: number[] = last12Days.map(day =>
          files.filter(f => f.createdAt.split('T')[0] === day).length
        );
        this.lineChartData = {
          labels: last12Days.map(d => d.slice(5)), // MM-dd
          datasets: [{
            data: uploadsByDay,
            label: 'Uploads',
            fill: true,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            tension: 0.3
          }]
        };

        // 📊 Doughnut & Bar (Category Distribution)
        const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#6366f1','#8b5cf6','#14b8a6','#e11d48'];
        this.doughnutChartData = {
          labels: this.categoryStats.map(c => c.label),
          datasets: [{
            data: this.categoryStats.map(c => c.value),
            backgroundColor: colors
          }]
        };
        this.barChartData = {
          labels: this.categoryStats.map(c => c.label),
          datasets: [{ label: 'Files', data: this.categoryStats.map(c => c.value), backgroundColor: '#3b82f6' }]
        };

        // 🔥 Most Uploaded Trend (top category uploads over days)
        const topCategory = this.categoryStats.sort((a,b)=>b.value-a.value)[0]?.label;
        if (topCategory) {
          const trendData = last12Days.map(day =>
            files.filter(f => {
              const cat = f.category === 'other' ? f.customCategory || 'Other' : f.category;
              return cat === topCategory && f.createdAt.split('T')[0] === day;
            }).length
          );
          this.miniLineChartData = {
            labels: last12Days.map(d => d.slice(5)),
            datasets: [{
              data: trendData,
              label: topCategory,
              borderColor: '#10b981',
              fill: false,
              tension: 0.3
            }]
          };
        }
      },
      error: (err) => console.error('Failed to fetch dashboard data', err)
    });
  }

  get chartColors(): string[] {
    return this.doughnutChartData.datasets[0].backgroundColor as string[];
  }

  // ✅ Utility to trim filename
  trimFilename(name: string, maxLength: number = 20): string {
    if (!name) return '';
    return name.length > maxLength ? name.slice(0, maxLength) + '…' : name;
  }
}
