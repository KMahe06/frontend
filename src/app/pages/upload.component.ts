import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent],
  template: `
    <div class="layout" [class.sidebar-closed]="isSidebarClosed">
      <!-- Hamburger Icon -->
      <button class="hamburger" *ngIf="isSidebarClosed" (click)="toggleSidebar()">
        <span></span><span></span><span></span>
      </button>

      <!-- Sidebar -->
      <app-sidebar (sidebarToggle)="onSidebarToggle($event)"></app-sidebar>

      <!-- Main Content -->
      <div class="content">
        <h1 class="page-title">📤 Upload Files</h1>
        <p class="quote">"Your uploaded files are safe with us."</p>

        <div class="upload-card">
          <h2 class="section-title">Choose Document</h2>

          <!-- Drag and Drop / Browse -->
          <div
            class="dropzone"
            (drop)="onFileDrop($event)"
            (dragover)="onDragOver($event)"
            (dragleave)="onDragLeave($event)">
            <div class="dropzone-head">
              <p *ngIf="!selectedFiles.length" class="drop-hint">
                Drag & Drop your files here or
                <label for="fileInput" class="browse-link">Browse</label>
              </p>

              <div class="actions" *ngIf="selectedFiles.length">
                <span class="count-chip">{{ selectedFiles.length }} file(s) selected</span>
                <button type="button" class="clear-all" (click)="clearAll()">Clear All</button>
              </div>
            </div>

            <!-- File list (scrollable area only for files) -->
            <div *ngIf="selectedFiles.length" class="file-list">
              <div *ngFor="let file of selectedFiles; let i = index; trackBy: trackByIndex" class="file-row">
                <div class="file-name">
                  <span class="file-pin">📌</span>
                  <span class="file-original" [title]="file.name">{{ file.name }}</span>
                </div>
                <div class="file-controls">
                  <input
                    type="text"
                    class="filename-input"
                    [(ngModel)]="manualFileNames[i]"
                    [placeholder]="file.name"
                  />
                  <button type="button" class="remove-file" (click)="removeFile(i)">❌ Remove</button>
                </div>
              </div>
            </div>

            <!-- Hidden file input -->
            <input #fileInputRef id="fileInput" type="file" multiple (change)="onFileSelect($event)" hidden />
          </div>

          <!-- Description -->
          <div *ngIf="selectedFiles.length" class="file-description">
            <label for="description">Description</label>
            <textarea id="description" [(ngModel)]="description" placeholder="Add description for the files"></textarea>
          </div>

          <!-- Category Dropdown -->
          <div *ngIf="selectedFiles.length" class="category-section">
            <label for="category">Select Category</label>
            <select id="category" [(ngModel)]="selectedCategory">
              <option value="" disabled selected>Select category</option>
              <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
            </select>
          </div>

          <!-- Custom Category Input -->
          <div *ngIf="selectedCategory === 'other'" class="category-section">
            <label for="customCategory">Enter Custom Category</label>
            <input
              id="customCategory"
              [(ngModel)]="customCategory"
              placeholder="Type your category here"
              [class.invalid]="submitted && !customCategory.trim()"
            />
            <div class="error-inline" *ngIf="submitted && !customCategory.trim()">
              Enter your custom category to upload
            </div>
          </div>

          <!-- Global error (fallback) -->
          <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>

          <!-- Submit Button -->
          <button class="btn-upload"
                  [disabled]="!selectedFiles.length || !selectedCategory"
                  (click)="onUpload()">
            🚀 Upload File(s)
          </button>

          <!-- Upload Messages -->
          <p *ngIf="uploadMessage" [ngClass]="{ 'success': uploadSuccess, 'error': !uploadSuccess }">
            {{ uploadMessage }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Layout */
    .layout { display: flex; min-height: 100vh; width: 100%; font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #fff; }
    app-sidebar { width: 240px; flex-shrink: 0; transition: all 0.3s ease; }
    .layout.sidebar-closed app-sidebar { display: none; }
    .content { flex: 1; padding: 40px; transition: all 0.3s ease; }

    /* Titles */
    .page-title { text-align: center; font-size: 30px; font-weight: 700; margin-bottom: 5px; color: #1e293b; }
    .quote { text-align: center; color: #6b7280; margin-bottom: 25px; font-size: 15px; }

    /* Upload Card */
    .upload-card {
      background: #fff;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.4);
      width: 100%;
      max-width: 900px;
      margin: 0 auto 40px auto;
      transition: 0.3s;
      color: #000;
    }
    .upload-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
    .section-title { font-size: 22px; font-weight: 600; margin-bottom: 18px; text-align: center; color: #000; }

    /* Dropzone */
    .dropzone {
      border: 2px dashed #060606;
      border-radius: 12px;
      padding: 28px;
      cursor: pointer;
      transition: 0.25s;
      margin-bottom: 20px;
      background: #fff;
      color: #000;
    }
    .dropzone:hover { background: #fff; border-color: #6d39a1; }
    .dropzone.dragover { background: #1e293b; border-color: #2563eb; color: white; }

    .dropzone-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
      text-align:center;
      padding-left:280px;
    }
    .drop-hint { margin: 0; }
    .actions { display: flex; align-items: center; gap: 10px; }
    .count-chip {
      font-size: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 999px;
      padding: 4px 10px;
      background: #f8fafc;
      color: #0f172a;
    }
    .clear-all {
      background: transparent; border: 1px solid #e2e8f0; padding: 6px 10px; border-radius: 8px;
      cursor: pointer; color: #334155; transition: 0.2s;
    }
    .clear-all:hover { background: #f1f5f9; }

    /* File list (scroll only inside list if too large) */
    .file-list {
      display: flex; flex-direction: column; gap: 10px;
      max-height: 250px; overflow-y: auto; padding-right: 4px;
    }
    .file-row {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      background: #f9fafb;
    }
    .file-name {
      display: flex; align-items: center; gap: 8px;
      min-width: 0;
    }
    .file-pin { flex: 0 0 auto; }
    .file-original {
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      color: #0f172a; font-weight: 600;
    }
    .file-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      max-width: 520px;
    }
    .filename-input {
      flex: 1 1 auto;
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      background: #fff;
      font-size: 14px;
    }
    .filename-input:focus {
      outline: none; border-color: #6366f1; box-shadow: 0 0 0 2px rgba(79,70,229,0.15);
    }

    .remove-file {
      background: transparent;
      border: none;
      color: #ef4444;
      font-size: 14px;
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 8px;
      transition: background 0.2s, color 0.2s;
      white-space: nowrap;
    }
    .remove-file:hover { color: #b91c1c; background: #fee2e2; }

    /* Inputs */
    .file-description, .category-section { margin-bottom: 18px; }
    label { display: block; margin-bottom: 6px; font-weight: 600; color: #0f172a; }
    select, textarea, input[type="text"] {
      width: 100%; padding: 12px; border-radius: 8px;
      border: 1px solid #334155; background: #fff; color: #000;
      font-size: 14px; transition: 0.25s;
    }
    select:focus, textarea:focus, input[type="text"]:focus {
      outline: none; border-color: #6366f1; box-shadow: 0 0 0 2px rgba(79,70,229,0.15);
    }
    textarea { min-height: 80px; resize: vertical; }

    /* Custom category input styling */
    #customCategory {
     width: 100%; padding: 12px; border-radius: 8px;
      border: 1px solid #334155; background: #fff; color: #000;
      font-size: 14px; transition: 0.25s;
    }
    #customCategory:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
      outline:none;
    }
    #customCategory.invalid {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
      background: #fff5f5;
     
    }
    .error-inline {
      margin-top: 6px;
      font-size: 13px;
      color: #b91c1c;
      background: #fee2e2;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid #fecaca;
    }

    /* Button */
    .btn-upload {
      width: 100%; padding: 14px; border-radius: 10px; border: none;
      background: linear-gradient(90deg, #16315e, #132448);
      color: #fff; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.25s;
    }
    .btn-upload:disabled { background: #475569; cursor: not-allowed; }
    .btn-upload:hover:not(:disabled) { background: linear-gradient(90deg, #2563eb, #1d4ed8); transform: translateY(-2px); }

    /* Messages */
    .success { color: #22c55e; margin-top: 12px; font-weight: 500; text-align: center; }
    .error { color: #ef4444; margin-top: 12px; font-weight: 500; text-align: center; }

    /* Browse Link */
    .browse-link { color: #2563eb; text-decoration: underline; cursor: pointer; }
    .browse-link:hover { color: #1d4ed8; }

    /* Hamburger */
    .hamburger {
      position: fixed; top: 20px; left: 20px; width: 25px; height: 20px;
      background: transparent; border: none; display: flex; flex-direction: column;
      justify-content: space-between; cursor: pointer; z-index: 1000;
    }
    .hamburger span { display: block; height: 4px; width: 100%; background: #000; border-radius: 2px; }

    /* Responsive */
    @media (max-width: 992px) {
      .upload-card { max-width: 100%; padding: 20px; }
      .page-title { font-size: 26px; }
      .file-controls { max-width: none; }
    }
    @media (max-width: 768px) {
      .content { padding: 20px; }
      .dropzone { padding: 20px; }
      .btn-upload { font-size: 14px; padding: 12px; }
      .file-row { grid-template-columns: 1fr; }
      .file-controls { width: 100%; }
    }
    @media (max-width: 480px) {
      .page-title { font-size: 22px; }
      .section-title { font-size: 18px; }
    }
  `]
})
export class UploadComponent implements OnInit {
  categories = ['aadhaar', 'pan', 'id proof', 'insurance docs', 'school marksheets', 'college marksheets', 'asset docs', 'other'];

  selectedFiles: File[] = [];
  manualFileNames: string[] = [];
  description = '';
  selectedCategory = '';
  customCategory = '';

  uploadMessage = '';
  uploadSuccess = false;
  errorMessage = '';
  submitted = false;

  isSidebarClosed = false;

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient) {}

  ngOnInit() { this.checkScreenSize(); }
  @HostListener('window:resize') onResize() { this.checkScreenSize(); }
  checkScreenSize() { this.isSidebarClosed = window.innerWidth <= 992; }
  onSidebarToggle(state: boolean) { this.isSidebarClosed = state; }
  toggleSidebar() { if (this.sidebar) this.sidebar.toggleSidebar(); }

  trackByIndex = (_: number, __: any) => _;

  private addFiles(files: FileList | File[]) {
    const incoming = Array.from(files);
    const existingKeys = new Set(this.selectedFiles.map(f => `${f.name}|${f.size}|${f.lastModified}`));

    incoming.forEach(f => {
      const key = `${f.name}|${f.size}|${f.lastModified}`;
      if (!existingKeys.has(key)) {
        this.selectedFiles.push(f);
        this.manualFileNames.push(f.name);
        existingKeys.add(key);
      }
    });
  }

  clearAll() {
    this.selectedFiles = [];
    this.manualFileNames = [];
    this.description = '';
    this.selectedCategory = '';
    this.customCategory = '';
    this.errorMessage = '';
    this.submitted = false;
    if (this.fileInputRef) this.fileInputRef.nativeElement.value = '';
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.manualFileNames.splice(index, 1);
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addFiles(input.files);
      input.value = '';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.remove('dragover');
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).classList.remove('dragover');
    if (event.dataTransfer?.files?.length) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onUpload() {
    this.submitted = true;
    this.errorMessage = '';
    this.uploadMessage = '';
    this.uploadSuccess = false;

    if (this.selectedCategory === 'other' && !this.customCategory.trim()) {
      this.errorMessage = 'Enter your custom category to upload';
      return;
    }

    this.uploadFiles();
  }

  private uploadFiles() {
  if (!this.selectedFiles.length) return;

  const categoryToSend = this.selectedCategory === 'other' ? this.customCategory.trim() : this.selectedCategory;

  // Post all files together (backend expects MultipartFile[] "files")
  const fd = new FormData();
  this.selectedFiles.forEach(file => {
    fd.append('files', file);  // ✅ corrected field name
  });

  const params = new URLSearchParams({
    files:this.selectedFiles.map((f, i) => this.manualFileNames[i] || f.name).join(','),
    description: this.description || '',
    category: categoryToSend
  }).toString();

  this.http.post(`http://localhost:8080/api/files/upload?${params}`, fd)  // ✅ corrected endpoint
    .subscribe({
      next: () => {
        this.uploadSuccess = true;
        this.uploadMessage = '✅ File(s) uploaded successfully!';
      },
      error: () => {
        this.uploadSuccess = false;
        this.uploadMessage = '❌ Failed to upload file(s). Please try again.';
      }
    });
}
   
}

