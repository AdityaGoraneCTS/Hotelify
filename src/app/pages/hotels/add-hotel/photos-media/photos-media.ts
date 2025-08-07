import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

interface ImagePreview {
  url: string; // This is a temporary data URL for the preview
  file: File;
  isPrimary: boolean;
}

@Component({
  selector: 'app-photos-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photos-media.html',
  styleUrls: ['./photos-media.css']
})
export class PhotosMediaComponent implements OnInit {
  @Input() initialImages: string[] = [];
  @Output() formSubmitted = new EventEmitter<{ files: File[], primaryFile: File | undefined }>();
  @Output() goBack = new EventEmitter<void>();
  @Output() imagesUpdated = new EventEmitter<{ images: string[], primaryImage?: string }>(); // <-- New Output

  imagePreviews: ImagePreview[] = [];
  isDragging = false;

  ngOnInit(): void {
    this.imagePreviews = this.initialImages.map((url, index) => ({
      url,
      file: new File([], url), // Placeholder file
      isPrimary: index === 0
    }));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(files: File[]): void {
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviews.push({
          url: e.target?.result as string,
          file: file,
          isPrimary: this.imagePreviews.length === 0
        });
        // Also emit the updated state after adding a file
        this.emitImagesUpdate();
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    if (this.imagePreviews.length > 0 && !this.imagePreviews.some(img => img.isPrimary)) {
      this.imagePreviews[0].isPrimary = true;
    }
    this.emitImagesUpdate(); // <-- Emit the update after removal
  }

  setPrimaryImage(index: number): void {
    this.imagePreviews.forEach((img, i) => img.isPrimary = i === index);
    const primaryImage = this.imagePreviews.splice(index, 1)[0];
    this.imagePreviews.unshift(primaryImage);
    this.emitImagesUpdate(); // <-- Emit the update after setting primary
  }

  onSubmit(): void {
    const files = this.imagePreviews.map(p => p.file);
    const primaryFile = this.imagePreviews.find(p => p.isPrimary)?.file;
    this.formSubmitted.emit({ files, primaryFile });
  }

  onGoBack(): void {
    this.goBack.emit();
  }

  private emitImagesUpdate(): void {
    const images = this.imagePreviews.map(p => p.url);
    const primaryImage = this.imagePreviews.find(p => p.isPrimary)?.url;
    this.imagesUpdated.emit({ images, primaryImage });
  }
}