import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./sidebar.component";
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NgChartsModule],
  template: `
    <div class="layout" [class.sidebar-closed]="isSidebarClosed">
      <!-- Sidebar -->
      <app-sidebar (sidebarToggle)="onSidebarToggle($event)"></app-sidebar>

      <!-- Main Content -->
      <div class="content fade-in">
        <!-- Header -->
        <h1 class="header">📊 Dashboard</h1>

        <!-- Top Section: Cards -->
        <div class="cards-row">
          <div class="card blue hover-scale">
            <h3>{{ totalFiles }}</h3>
            <p>Total Files Uploaded</p>
          </div>
          <div class="card green hover-scale">
            <h3>{{ categories.length }}</h3>
            <p>Categories Used</p>
          </div>
          <div class="card yellow hover-scale">
            <h3>{{ recentUploads }}</h3>
            <p>Recent Uploads</p>
          </div>
        </div>

        <!-- Full width Bar Graph -->
        <div class="chart-section hover-scale">
          <h3 class="chart-title">📂 Files by Category</h3>
          <canvas
            baseChart
            [data]="barChartData"
            [options]="barChartOptions"
            [type]="barChartType"
            [plugins]="barChartPlugins">
          </canvas>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      display: block;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: linear-gradient(135deg, #f9fafb, #eef2ff);
    }

    .layout {
      display: flex;
      height: 100vh;
      transition: all 0.3s ease-in-out;
    }

    app-sidebar {
      flex: 0 0 250px;
      transition: all 0.3s ease-in-out;
    }

    .layout.sidebar-closed app-sidebar {
      flex: 0 0 0;
      width: 0;
      overflow: hidden;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px;
      transition: all 0.3s ease-in-out;
      width: calc(100% - 250px);
    }

    .layout.sidebar-closed .content {
      width: 100%;
    }

    /* Header */
    .header {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 20px;
      color: #111827;
      letter-spacing: -0.5px;
    }

    /* Fade-in animation */
    .fade-in {
      animation: fadeIn 0.8s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Cards Row */
    .cards-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .card {
      flex: 1;
      padding: 20px;
      border-radius: 16px;
      background: linear-gradient(135deg, #ffffff, #f9fafb);
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      text-align: center;
      transition: all 0.3s ease;
    }

    .card:hover {
      background: linear-gradient(135deg, #f3f4f6, #ffffff);
    }

    .card h3 {
      font-size: 28px;
      margin: 0;
      font-weight: 700;
      color: #111827;
    }

    .card p {
      margin: 5px 0 0;
      font-size: 15px;
      color: #6b7280;
    }

    .card.blue { border-left: 6px solid #3b82f6; }
    .card.green { border-left: 6px solid #10b981; }
    .card.yellow { border-left: 6px solid #f59e0b; }

    /* Hover Scale + Shadow */
    .hover-scale {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .hover-scale:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    /* Chart Section */
    .chart-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #ffffff, #f9fafb);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      min-height: 0;
      transition: all 0.3s ease;
    }

    .chart-title {
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 600;
      color: #1f2937;
    }

    canvas {
      flex: 1;
      width: 100% !important;
      height: 100% !important;
      min-height: 0;
    }

    /* Responsive tweaks */
    @media (max-width: 992px) {
      .cards-row {
        flex-direction: column;
      }
    }

    @media (max-width: 768px) {
      .header {
        font-size: 26px;
      }
    }
  `]
})
export class DashboardComponent {
  isSidebarClosed = false;

  totalFiles = 25;
  recentUploads = 3;
  categories = [
    'aadhaar', 'pan', 'id proof', 'insurance docs',
    'school marksheets', 'college marksheets', 'asset docs', 'other'
  ];

  onSidebarToggle(state: boolean) {
    this.isSidebarClosed = state;
  }

  // Chart Config
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 14 } } },
      y: { beginAtZero: true, ticks: { font: { size: 14 } } }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  public barChartType: 'bar' = 'bar';
  public barChartPlugins = [{
    id: 'gradientBar',
    beforeDatasetsDraw: (chart: any) => {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((dataset: any, i: number) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar: any, index: number) => {
          const gradient = ctx.createLinearGradient(0, bar.y, 0, bar.base);
          gradient.addColorStop(0, this.gradientColors[index % this.gradientColors.length][0]);
          gradient.addColorStop(1, this.gradientColors[index % this.gradientColors.length][1]);
          bar.options.backgroundColor = gradient;
        });
      });
    }
  }];

  gradientColors = [
    ['#3b82f6', '#60a5fa'],
    ['#10b981', '#34d399'],
    ['#f59e0b', '#fbbf24'],
    ['#ef4444', '#f87171'],
    ['#6366f1', '#818cf8'],
    ['#8b5cf6', '#a78bfa'],
    ['#ec4899', '#f472b6'],
    ['#14b8a6', '#2dd4bf']
  ];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.categories,
    datasets: [
      {
        label: 'Files',
        data: [4, 6, 3, 5, 7, 8, 2, 4],
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };
}
