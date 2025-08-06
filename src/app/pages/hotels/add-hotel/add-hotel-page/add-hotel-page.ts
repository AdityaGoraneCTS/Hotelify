import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../../../core/models/hotel.model';
import { HotelListingService } from '../../../../core/services/hotel-listing-service'; 
import { BasicInformationComponent } from '../basic-information/basic-information'; 
import { LocationContactComponent } from '../location-contact/location-contact';
import { PhotosMediaComponent } from '../photos-media/photos-media';

@Component({
  selector: 'app-add-hotel-page',
  standalone: true,
  imports: [
    CommonModule,
    BasicInformationComponent,
    LocationContactComponent,
    PhotosMediaComponent
  ],
  templateUrl: './add-hotel-page.html',
  styleUrls: ['./add-hotel-page.css']
})
export class AddHotelPageComponent {
  currentStep = 1;
  hotelData: Partial<Hotel> = {};
  steps = [
    { label: 'Basic Info', key: 1 },
    { label: 'Location & Contact', key: 2 },
    { label: 'Photos & Media', key: 3 },
    { label: 'Features & Amenities', key: 4 },
    { label: 'Pricing & Policies', key: 5 },
    { label: 'Room Details', key: 6 },
    { label: 'Review & Submit', key: 7 }
  ];

  constructor(private hotelListingService: HotelListingService) {}

  ngOnInit(): void {
    const savedData = localStorage.getItem('hotelListingForm');
    if (savedData) {
      this.hotelData = JSON.parse(savedData);
      if (this.hotelData.images && this.hotelData.images.length > 0) {
        this.currentStep = 3; // Update to the last completed step
      } else if (this.hotelData.address && this.hotelData.contact) {
        this.currentStep = 2;
      }
    }
  }

  ngOnDestroy(): void {
    // Save data to localStorage when the user navigates away
    this.saveProgress();
  }

  onBasicInfoSubmitted(data: Partial<Hotel>): void {
    this.hotelData = { ...this.hotelData, ...data };
    this.saveProgress();
    this.currentStep = 2;
  }

  onLocationContactSubmitted(data: Partial<Hotel>): void {
    this.hotelData = { ...this.hotelData, ...data };
    this.saveProgress();
    this.currentStep = 3;
  }

  onPhotosMediaSubmitted(data: { images: string[], primaryImage: string | undefined }): void {
    this.hotelData = { ...this.hotelData, images: data.images, primaryImage: data.primaryImage };
    this.saveProgress();
    this.currentStep = 4;
    console.log('Step 3 data:', this.hotelData);
  }

  onGoBack(): void {
    this.currentStep--;
  }

  private saveProgress(): void {
    localStorage.setItem('hotelListingForm', JSON.stringify(this.hotelData));
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }
}