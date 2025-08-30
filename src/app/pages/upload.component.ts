import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SidebarComponent],
  template: `
    <div class="layout" [class.sidebar-closed]="isSidebarClosed">
      <!-- Hamburger Icon (only when sidebar is closed) -->
      <button class="hamburger" *ngIf="isSidebarClosed" (click)="toggleSidebar()">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Sidebar -->
      <app-sidebar (sidebarToggle)="onSidebarToggle($event)"></app-sidebar>

      <!-- Main Content -->
      <div class="content">
        <h1 class="page-title">Upload Files</h1>
        <p class="quote">"Your uploaded files are safe with us."</p>

        <div class="upload-card">
          <h2 class="section-title">Choose Document</h2>

          <!-- Drag and Drop / Browse -->
          <div
            class="dropzone"
            (drop)="onFileDrop($event)"
            (dragover)="onDragOver($event)"
            (dragleave)="onDragLeave($event)">
            <p *ngIf="!selectedFile">
              Drag & Drop your file here or
              <label for="fileInput" class="browse-link">Browse</label>
            </p>
            <p *ngIf="selectedFile">Selected File: {{ selectedFile.name }}</p>
            <input id="fileInput" type="file" (change)="onFileSelect($event)" hidden />
          </div>

          <!-- Filename input -->
          <div class="filename-section">
            <label for="filename" class="file-label">Enter Filename</label>
            <br />
            <input type="text" id="filename" [(ngModel)]="manualFileName" placeholder="Enter filename here..." />
          </div>

          <!-- File Description -->
          <div *ngIf="selectedFile" class="file-description">
            <label for="description">Description</label>
            <textarea id="description" [(ngModel)]="description" placeholder="Add description for the file"></textarea>
          </div>

          <!-- Category Dropdown -->
          <div *ngIf="selectedFile" class="category-section">
            <label for="category">Select Category</label>
            <select id="category" [(ngModel)]="selectedCategory">
              <option value="" disabled selected>Select category</option>
              <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
            </select>
          </div>

          <!-- Custom Category Input -->
          <div *ngIf="selectedCategory === 'other'" class="category-section">
            <label for="customCategory">Enter Custom Category</label>
            <br />
            <input id="customCategory" [(ngModel)]="customCategory" placeholder="Type your category here" />
          </div>

          <!-- Submit Button -->
          <button class="btn-upload" [disabled]="!selectedFile || !selectedCategory" (click)="uploadFile()">Upload File</button>

          <!-- Upload Messages -->
          <p *ngIf="uploadMessage" [ngClass]="{ 'success': uploadSuccess, 'error': !uploadSuccess }">
            {{ uploadMessage }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
      background: #fff;
      font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      transition: all 0.3s ease;
      width: 100%;
    }

    app-sidebar {
      width: 240px;
      flex-shrink: 0;
      transition: all 0.3s ease;
    }

    /* When sidebar is closed */
    .layout.sidebar-closed app-sidebar {
      display: none;
    }

    .content {
      flex: 1;
      padding: 40px;
      overflow-y: auto;
      transition: all 0.3s ease;
      width: 100%;
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

    .upload-card {
      background: #fff;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .upload-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(0,0,0,0.12);
    }

    .section-title {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 16px;
      text-align: center;
    }

    .dropzone {
      border: 2px dashed #4f46e5;
      border-radius: 10px;
      padding: 50px;
      text-align: center;
      cursor: pointer;
      transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
      margin-bottom: 20px;
      background: #fdfdff;
    }

    .dropzone:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 14px rgba(79,70,229,0.15);
    }

    .dropzone.dragover {
      background: #eef2ff;
      border-color: #3730a3;
    }

    .file-description,
    .category-section {
      margin-bottom: 20px;
    }

    .file-description textarea,
    .category-section select {
      width: 100%;
      border-radius: 8px;
      padding: 12px;
      border: 1px solid #d1d5db;
      font-size: 14px;
    }

    .file-description textarea:focus,
    .category-section select:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
    }

    #customCategory {
      width: 100%;
      border-radius: 8px;
      padding: 12px;
      border: 1px solid #d1d5db;
      font-size: 14px;
      margin-top: 10px;
    }

    #customCategory:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
    }

    .file-label {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 5px;
    }

    input[type="file"],
    input[type="text"] {
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      font-size: 14px;
      background-color: #fff;
    }

    input[type="file"]:focus,
    input[type="text"]:focus {
      border-color: #2563eb;
      outline: none;
      box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
    }

    .btn-upload {
      width: 100%;
      padding: 14px;
      border-radius: 10px;
      border: none;
      background: darkblue;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.25s ease, transform 0.25s ease;
    }

    .btn-upload:disabled {
      background: #a5b4fc;
      cursor: not-allowed;
    }

    .btn-upload:hover:not(:disabled) {
      background: linear-gradient(90deg, #4f46e5, #3730a3);
      transform: translateY(-2px);
    }

    .browse-link {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }

    .browse-link:hover {
      color: darkblue;
    }

    /* Hamburger Button */
    .hamburger {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 25px;
      height: 20px;
      background: transparent;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      z-index: 1000;
      padding: 0;
    }

    .hamburger span {
      display: block;
      height: 4px;
      width: 100%;
      background: #000;
      border-radius: 2px;
      transition: background 0.3s ease;
    }

    

    /* ✅ RESPONSIVENESS */
    @media (max-width: 1200px) {
      .upload-card {
        max-width: 90%;
      }
    }

    @media (max-width: 992px) {
      .upload-card {
        max-width: 100%;
        padding: 20px;
      }
      .page-title {
        font-size: 26px;
      }
    }

    @media (max-width: 768px) {
      .content {
        padding: 20px;
      }
      .dropzone {
        padding: 30px;
      }
      .btn-upload {
        font-size: 14px;
        padding: 12px;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 22px;
      }
      .section-title {
        font-size: 18px;
      }
    }
  `]
})
export class UploadComponent implements OnInit {
  categories = ['aadhaar', 'pan', 'id proof', 'insurance docs', 'school marksheets', 'college marksheets', 'asset docs', 'other'];
  selectedFile: File | null = null;
  description: string = '';
  selectedCategory: string = '';
  uploadMessage: string = '';
  uploadSuccess: boolean = false;
  customCategory: string = '';
  manualFileName: string = '';
  isSidebarClosed = false;

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSidebarClosed = window.innerWidth <= 992; // Auto collapse on small screens
  }

  onSidebarToggle(state: boolean) {
    this.isSidebarClosed = state;
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.toggleSidebar();
    }
  }

  onFileSelect(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (!this.manualFileName) {
        this.manualFileName = this.selectedFile.name;
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const dropzone = (event.currentTarget as HTMLElement);
    dropzone.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    const dropzone = (event.currentTarget as HTMLElement);
    dropzone.classList.remove('dragover');
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const dropzone = (event.currentTarget as HTMLElement);
    dropzone.classList.remove('dragover');

    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    const categoryToSend = this.selectedCategory === 'other' ? this.customCategory : this.selectedCategory;

    const params = new URLSearchParams({
      filename: this.manualFileName,
      description: this.description,
      category: categoryToSend
    }).toString();

    this.http.post(`http://localhost:8080/api/files/upload/file?${params}`, formData).subscribe({
      next: () => {
        this.uploadSuccess = true;
        this.uploadMessage = "✅ File uploaded successfully!";
      },
      error: () => {
        this.uploadSuccess = false;
        this.uploadMessage = "❌ Failed to upload file. Please try again.";
      }
    });
  }
}
