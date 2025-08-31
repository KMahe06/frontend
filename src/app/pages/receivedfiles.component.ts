import { Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';
import { PaginationService,PaginatedResponse } from '../core/pagination';
import { Router } from '@angular/router';
interface ReceivedFile {
  senderName: string;
  recipientName: string;
  filename: string;
  category: string;
  isSensitive: boolean;

}

@Component({
  selector: 'app-receivedfiles',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent],
  template: `
    <div class="layout" [class.sidebar-closed]="isSidebarClosed">
      <!-- Hamburger -->
      <button class="hamburger" *ngIf="isSidebarClosed" (click)="toggleSidebar()">
        <span></span><span></span><span></span>
      </button>

      <!-- Sidebar -->
      <app-sidebar (sidebarToggle)="onSidebarToggle($event)"></app-sidebar>

      <!-- Main Content -->
      <div class="content">
        <h1 class="page-title">Received Files</h1>
        <p class="quote">"Here are the files you have received."</p>

        <!-- Search + Filters -->
        <div class="toolbar">
          <input type="text" [(ngModel)]="searchQuery" (input)="searchFilesWithPagination()" placeholder="Search by sender name, filename or category..." />

          <div class="filters">
            <button [class.active]="filterType === 'all'" (click)="setFilter('all')">All</button>
            <button [class.active]="filterType === 'sensitive'" (click)="setFilter('sensitive')">Sensitive</button>
            <button [class.active]="filterType === 'insensitive'" (click)="setFilter('insensitive')">Insensitive</button>
          </div>
        </div>

        <!-- Card Grid -->
        <div class="card-grid">
          <div
            class="file-card"
            *ngFor="let file of filteredFiles"
            #cardEl
          >
            <h3>{{ file.filename }}</h3>
            <p><strong>Sender:</strong> {{ file.senderName }}</p>
            <p><strong>Receiver:</strong> {{ file.recipientName }}</p>
            <p><strong>Category:</strong> {{ file.category }}</p>
            <p><strong>Sensitivity:</strong>
              <span [class.sensitive]="file.isSensitive" [class.insensitive]="!file.isSensitive">
                {{ file.isSensitive ? 'Sensitive' : 'Insensitive' }}
              </span>
            </p>
          </div>
        </div>
        <div class="pagination">
          <button (click)="prevPage()" [disabled]="currentPage === 0">Prev</button>
          <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
          <button (click)="nextPage()" [disabled]="currentPage + 1 >= totalPages">Next</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
      width: 100%;
       font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      transition: all 0.3s ease;
      background: #f9fafb;
    }
    app-sidebar {
      width: 240px;
      flex-shrink: 0;
      transition: all 0.3s ease;
    }
    .layout.sidebar-closed app-sidebar {
      display: none;
    }
    .content {
      flex: 1;
      padding: 30px;
      transition: all 0.3s ease;
    }

    .page-title {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .quote {
      text-align: center;
      color: #6b7280;
      margin-bottom: 25px;
    }

    /* Toolbar */
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
      margin-bottom: 25px;
    }
    .toolbar input {
      flex: 1;
      min-width: 250px;
      max-width: 400px;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #ccc;
      font-size: 15px;
      transition: all 0.3s ease;
    }
    .toolbar input:focus {
      outline: none;
      border: 1px solid transparent;
      background-clip: padding-box;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5); /* purple glow */
    }

    .filters {
      display: flex;
      gap: 10px;
    }
    .filters button {
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      background: #e5e7eb;
      transition: background 0.2s ease;
    }
    .filters button.active {
      background: linear-gradient(135deg, #8b5cf6, #6366f1);
      color: white;
    }

    /* Grid */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      align-items: stretch;
    }
    .file-card {
      background: #fff;
      padding: 20px;
      border-radius: 14px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .file-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.12);
    }
    .file-card h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #111827;
    }
    .file-card p {
      margin: 4px 0;
      font-size: 14px;
      color: #374151;
    }

    .sensitive { color: #dc2626; font-weight: bold; }
    .insensitive { color: #16a34a; font-weight: bold; }
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
    /* Hamburger */
    .hamburger {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 25px;
      height: 20px;
      border: none;
      background: transparent;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      z-index: 1100;
    }
    .hamburger span {
      display: block;
      width: 100%;
      height: 4px;
      background: #000;
      border-radius: 2px;
    }

    /* Responsiveness */
    @media (max-width: 768px) {
      .content { padding: 15px; }
      .page-title { font-size: 24px; }
      .card-grid { gap: 15px; }
      .file-card { padding: 15px; }
    }
  `]
})
export class ReceivedFilesComponent implements OnInit, AfterViewInit {
  allFiles: ReceivedFile[] = [];
  filteredFiles: ReceivedFile[] = [];
  searchQuery: string = '';
  filterType: 'all' | 'sensitive' | 'insensitive' = 'all';
  isSidebarClosed = false;

  @ViewChildren('cardEl') cardElements!: QueryList<ElementRef>;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  
  constructor(private http: HttpClient, private router: Router,private paginationService:PaginationService) {}

  ngOnInit() {
    this.checkScreenSize();
    this.fetchReceivedFiles();
    this.loadPage();
  }

  ngAfterViewInit() {
    this.adjustCardHeights();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
    this.adjustCardHeights();
  }

  checkScreenSize() {
    this.isSidebarClosed = window.innerWidth <= 992;
  }

  onSidebarToggle(state: boolean) {
    this.isSidebarClosed = state;
  }

  toggleSidebar() {
    if (this.sidebar) this.sidebar.toggleSidebar();
  }

  fetchReceivedFiles() {
  this.http.get<PaginatedResponse<ReceivedFile>>(
    'http://localhost:8080/api/shared-files/to-me',
    { params: { pageNumber: this.currentPage.toString(), pageSize: this.pageSize.toString() } }
  ).subscribe({
    next: (res) => {
      this.allFiles = res.fetchFiles;
      this.totalPages = res.totalPages;
      this.totalElements = res.totalElements;
      this.applyFilters();
      setTimeout(() => this.adjustCardHeights(), 0);
    },
    error: (err) => console.error('Failed to fetch received files', err)
  });
}

 searchFiles() {
  if (!this.searchQuery.trim()) {
    this.fetchReceivedFiles();
    return;
  }

  this.http.get<PaginatedResponse<ReceivedFile>>(
    'http://localhost:8080/api/shared-files/to-me',
    { params: { keyword: this.searchQuery, pageNumber: this.currentPage.toString(), pageSize: this.pageSize.toString() } }
  ).subscribe({
    next: (res) => {
      this.allFiles = res.fetchFiles;
      this.totalPages = res.totalPages;
      this.applyFilters();
      setTimeout(() => this.adjustCardHeights(), 0);
    },
    error: (err) => console.error('Search failed', err)
  });
}

  setFilter(type: 'all' | 'sensitive' | 'insensitive') {
    this.filterType = type;
    this.applyFilters();
  }

  private applyFilters() {
    let files = [...this.allFiles];

    if (this.filterType === 'sensitive') {
      files = files.filter(f => f.isSensitive);
    } else if (this.filterType === 'insensitive') {
      files = files.filter(f => !f.isSensitive);
    }

    this.filteredFiles = files;
  }

  private adjustCardHeights() {
    if (!this.cardElements || this.cardElements.length === 0) return;
    this.cardElements.forEach(card => card.nativeElement.style.height = 'auto');
    let maxHeight = 0;
    this.cardElements.forEach(card => {
      const height = card.nativeElement.offsetHeight;
      if (height > maxHeight) maxHeight = height;
    });
    this.cardElements.forEach(card => {
      card.nativeElement.style.height = maxHeight + 'px';
    });
  }

  // private syncToMyWallet(files: ReceivedFile[]) {
  //   this.http.post('http://localhost:8080/api/shared-files/to-me', files).subscribe({
  //     next: () => console.log('Files synced to MyWallet'),
  //     error: (err) => console.error('Failed to sync to MyWallet', err)
  //   });
  // }
  currentPage = 0;
  totalPages = 0;
  pageSize = 6;   // ✅ match backend
  totalElements = 0;

loadPage() {
  this.http.get<PaginatedResponse<ReceivedFile>>(
    'http://localhost:8080/api/shared-files/to-me',
    { params: { pageNumber: this.currentPage.toString(), pageSize: this.pageSize.toString() } }
  ).subscribe((res: PaginatedResponse<ReceivedFile>) => {
    this.allFiles = res.fetchFiles;
    this.totalPages = res.totalPages;
    this.totalElements = res.totalElements;
    this.applyFilters();
    setTimeout(() => this.adjustCardHeights(), 0);
  });
}

  nextPage() {
  if (this.currentPage + 1 < this.totalPages) {
    this.currentPage++;
    this.searchQuery.trim()
      ? this.searchFilesWithPagination()
      : this.loadPage();
  }
}

prevPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.searchQuery.trim()
      ? this.searchFilesWithPagination()
      : this.loadPage();
  }
}
 goToPage(page: number) {
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;

    if (this.searchQuery.trim()) {
      this.searchFilesWithPagination();
    } else {
      this.loadPage();
    }
  }
}


  //✅ Search with Pagination
 searchFilesWithPagination() {
  if (!this.searchQuery.trim()) {
    this.currentPage = 0;
    this.loadPage();
    return;
  }

  this.http.get<PaginatedResponse<ReceivedFile>>(
    'http://localhost:8080/api/shared-files/to-me',
    {
      params: {
        keyword: this.searchQuery,
        pageNumber: this.currentPage.toString(),
        pageSize: this.pageSize.toString()
      }
    }
  ).subscribe({
    next: (res) => {
      this.allFiles = res.fetchFiles;
      this.totalPages = res.totalPages;
      this.applyFilters();
    },
    error: (err) => console.error('Search failed', err)
  });
}
}
