import { Component, OnInit, HostListener, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar.component';
import { Router } from '@angular/router';
import { PaginationService,PaginatedResponse } from '../core/pagination';

interface FileData {
  id: number;
  filename: string;
  description: string;
  category: string;
  customCategory?: string;
}

@Component({
  selector: 'app-mywallet',
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
        <h1 class="page-title">My Wallet</h1>
        <p class="quote">"All your uploaded documents are here."</p>

        <!-- Search -->
        <div class="search-bar">
          <input type="text" [(ngModel)]="searchQuery" (input)="searchFilesWithPagination()" placeholder="Search by filename, category or description..." />
        </div>

        <!-- Card Grid -->
        <div class="card-grid">
          <div
            class="file-card"
            *ngFor="let file of files"
            #cardEl
            [class.active]="selectedCard?.id === file.id"
            (click)="selectCard(file)"
          >
            <h3>ID: {{ file.id }}</h3>
            <p><strong>Name:</strong> {{ file.filename }}</p>
            <p><strong>Description:</strong> {{ file.description }}</p>
            <p class="category">
              <strong>Category:</strong> {{ file.category === 'other' ? file.customCategory : file.category }}
            </p>

            <div class="card-actions">
              <button class="btn btn-download" (click)="downloadFile(file, $event)">Download</button>
              <button class="btn btn-share" (click)="shareFile(file, $event)">Share</button>
              <button class="btn btn-delete-me" (click)="deleteForMe(file, $event)">Delete for Me</button>
              <button class="btn btn-delete-everyone" (click)="deleteForEveryone(file, $event)">Delete for Everyone</button>
            </div>
          </div>
        </div>
       <!-- Pagination Controls -->
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
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .quote {
      text-align: center;
      color: #6b7280;
      margin-bottom: 20px;
    }

    /* Search */
    .search-bar {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
    .search-bar input {
      width: 100%;
      max-width: 600px;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #ccc;
      font-size: 15px;
      transition: box-shadow 0.2s ease;
    }
    .search-bar input:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
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
      border-radius: 16px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .file-card:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 10px 25px rgba(0,0,0,0.12);
    }
    .file-card h3 {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: 600;
      color: #111827;
    }
    .file-card p {
      margin: 4px 0;
      font-size: 14px;
      color: #374151;
    }
    .file-card .category {
      font-weight: 600;
      color: #1e3a8a;
    }

    /* Card Actions */
    .card-actions {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .btn {
      padding: 10px 14px;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .btn-download {
      background: #2563eb;
      color: white;
    }
    .btn-download:hover {
      background: #1e40af;
    }
    .btn-share {
      background: #16a34a;
      color: white;
    }
    .btn-share:hover {
      background: #15803d;
    }
    .btn-delete-me {
      background: #f59e0b;
      color: white;
    }
    .btn-delete-me:hover {
      background: #b45309;
    }
    .btn-delete-everyone {
      background: #dc2626;
      color: white;
    }
    .btn-delete-everyone:hover {
      background: #991b1b;
    }

    /* Active Card */
    .file-card.active {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 400px;
      max-width: 95%;
      transform: translate(-50%, -50%) scale(1.05);
      z-index: 999;
      box-shadow: 0 15px 35px rgba(0,0,0,0.25);
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

    /* Responsiveness */
    @media (max-width: 768px) {
      .content { padding: 15px; }
      .page-title { font-size: 24px; }
      .card-grid { gap: 15px; }
      .file-card { padding: 15px; }
    }
  `]
})
export class MyWalletComponent implements OnInit, AfterViewInit {
  files: FileData[] = [];
  selectedCard: FileData | null = null;
  isSidebarClosed = false;
  searchQuery: string = '';

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @ViewChildren('cardEl') cardElements!: QueryList<ElementRef>;

  constructor(private http: HttpClient, private router: Router,private paginationService:PaginationService) {}

  ngOnInit() {
    this.checkScreenSize();
    this.fetchFiles();
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

  fetchFiles() {
    this.http.get<FileData[]>('http://localhost:8080/api/files').subscribe({
      next: (res) => {
        this.files = res;
        setTimeout(() => this.adjustCardHeights(), 0);
      },
      error: (err) => { console.error('Failed to fetch files', err); }
    });
  }

  searchFileswithApi() {
    if (!this.searchQuery.trim()) {
      this.fetchFiles();
      return;
    }
    this.http.get<FileData[]>(`http://localhost:8080/api/files/search?query=${this.searchQuery}`).subscribe({
      next: (res) => {
        this.files = res;
        setTimeout(() => this.adjustCardHeights(), 0);
      },
      error: (err) => { console.error('Search failed', err); }
    });
  }

  downloadFile(file: FileData, event: MouseEvent) {
    event.stopPropagation();
    this.http.get(`http://localhost:8080/api/files/download/${file.id}`, { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.filename;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => { console.error('Download failed', err); }
      });
  }

  shareFile(file: FileData, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/sensitivity', file.id]);
  }

  deleteForMe(file: FileData, event: MouseEvent) {
    event.stopPropagation();
    this.http.delete(`http://localhost:8080/api/files/delete-for-me/${file.id}`).subscribe({
      next: () => {
        this.files = this.files.filter(f => f.id !== file.id);
      },
      error: (err) => { console.error('Delete for me failed', err); }
    });
  }

  deleteForEveryone(file: FileData, event: MouseEvent) {
    event.stopPropagation();
    this.http.delete(`http://localhost:8080/api/files/delete-for-everyone/${file.id}`).subscribe({
      next: () => {
        this.files = this.files.filter(f => f.id !== file.id);
      },
      error: (err) => { console.error('Delete for everyone failed', err); }
    });
  }

  selectCard(file: FileData) {
    this.selectedCard = this.selectedCard?.id === file.id ? null : file;
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
   


  currentPage = 0;
  totalPages = 0;
  pageSize = 6;   // ✅ match backend
  totalElements = 0;

 loadPage() {
    this.paginationService.getPaginatedData<FileData>('mywallet', this.currentPage, this.pageSize)
      .subscribe((res: PaginatedResponse<FileData>) => {
        this.files = res.fetchFiles;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
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

    this.http.get<PaginatedResponse<FileData>>(`http://localhost:8080/api/files/search`, {
      params: { query: this.searchQuery, page: this.currentPage.toString(), size: this.pageSize.toString() }
    }).subscribe({
      next: (res) => {
        this.files = res.fetchFiles;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error('Search failed', err)
    });
  }
}
