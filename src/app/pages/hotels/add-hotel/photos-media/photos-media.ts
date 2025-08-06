import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ImagePreview {
  url: string;
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
export class PhotosMediaComponent {
  @Input() initialImages: string[] = [];
  @Output() formSubmitted = new EventEmitter<{ images: string[], primaryImage: string | undefined }>();
  @Output() goBack = new EventEmitter<void>();

  imagePreviews: ImagePreview[] = [];
  isDragging = false;

  constructor() {
    this.imagePreviews = this.initialImages.map((url, index) => ({
      url,
      file: new File([], url), // Placeholder for file
      isPrimary: index === 0 // Assume the first image is primary
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
        continue; // Skip non-image files
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviews.push({
          url: e.target?.result as string,
          file: file,
          isPrimary: this.imagePreviews.length === 0
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    if (this.imagePreviews.length > 0 && !this.imagePreviews.some(img => img.isPrimary)) {
      this.imagePreviews[0].isPrimary = true; // Set a new primary if the old one was removed
    }
  }

  setPrimaryImage(index: number): void {
    this.imagePreviews.forEach((img, i) => img.isPrimary = i === index);
    // Reorder the array to put the primary image first
    const primaryImage = this.imagePreviews.splice(index, 1)[0];
    this.imagePreviews.unshift(primaryImage);
  }

  onSubmit(): void {
    // In a real application, you would upload these files to a server
    // and get back the final image URLs.
    // For this example, we'll simulate it by returning the local URLs.
    const imageUrls = this.imagePreviews.map(img => img.url);
    const primaryImage = this.imagePreviews.find(img => img.isPrimary)?.url;
    this.formSubmitted.emit({ images: imageUrls, primaryImage });
  }

  onGoBack(): void {
    this.goBack.emit();
  }
}