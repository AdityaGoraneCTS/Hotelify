import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hotel, HotelPolicies } from '../../../../core/models/hotel.model';
import { HotelListingService } from '../../../../core/services/hotel-listing-service'; 
import { BasicInformationComponent } from '../basic-information/basic-information'; 
import { LocationContactComponent } from '../location-contact/location-contact';
import { PhotosMediaComponent } from '../photos-media/photos-media';
import { FeaturesAmenitiesComponent } from '../features-amenities/features-amenities';
import { PoliciesComponent } from '../policies/policies';

@Component({
  selector: 'app-add-hotel-page',
  standalone: true,
  imports: [
    CommonModule,
    BasicInformationComponent,
    LocationContactComponent,
    PhotosMediaComponent,
    FeaturesAmenitiesComponent,
    PoliciesComponent
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
      if (this.hotelData.policies){
        this.currentStep = 5;
      } else if(this.hotelData.features && this.hotelData.amenities){
        this.currentStep = 4;
      } else if (this.hotelData.images && this.hotelData.images.length > 0) {
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

  // New method to handle real-time image updates from the child component
  onImagesUpdated(data: { images: string[], primaryImage?: string }): void {
    this.hotelData.images = data.images;
    this.hotelData.primaryImage = data.primaryImage;
    this.saveProgress();
  }

  onPhotosMediaSubmitted(data: { files: File[], primaryFile: File | undefined }): void {
    this.hotelListingService.uploadImages(data.files).subscribe(uploadedUrls => {
      this.hotelData.images = uploadedUrls;
      this.hotelData.primaryImage = uploadedUrls.find(url => url.includes(data.primaryFile?.name || ''));

      this.saveProgress();
      this.currentStep = 4;
      console.log('Step 3 data with permanent URLs:', this.hotelData);
    });
  }

  onFeaturesAmenitiesSubmitted(data: { features: string[], amenities: string[] }): void {
    this.hotelData = { ...this.hotelData, ...data };
    this.saveProgress();
    this.currentStep = 5;
    console.log('Step 4 data:', this.hotelData);
  }

  // New method to handle real-time updates from the child component
  onFeaturesAmenitiesUpdated(data: { features: string[], amenities: string[] }): void {
      this.hotelData = { ...this.hotelData, ...data };
      this.saveProgress();
  }

  onPoliciesSubmitted(data: { policies: HotelPolicies, isFullyRefundable: boolean, hasFreeBreakfast: boolean, reserveNowPayLater: boolean }): void {
    this.currentStep = 6;
    console.log('Step 5 data:', this.hotelData);
  }

  onPoliciesUpdated(data: { policies: HotelPolicies, isFullyRefundable: boolean, hasFreeBreakfast: boolean, reserveNowPayLater: boolean }): void {
    this.hotelData.policies = data.policies;
    this.hotelData.isFullyRefundable = data.isFullyRefundable;
    this.hotelData.hasFreeBreakfast = data.hasFreeBreakfast;
    this.hotelData.reserveNowPayLater = data.reserveNowPayLater;
    this.saveProgress();
  }

  onGoBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private saveProgress(): void {
    localStorage.setItem('hotelListingForm', JSON.stringify(this.hotelData));
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }
}