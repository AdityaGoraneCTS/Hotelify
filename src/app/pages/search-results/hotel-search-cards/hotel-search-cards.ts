



import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../../core/models/hotel.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel-search-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotel-search-cards.html',
  styleUrl: './hotel-search-cards.css'
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;

  // Map features to Bootstrap Icons
  featureIcons: { [key: string]: string } = {
    'Pool': 'bi-water',
    'Spa': 'bi-gem',
    'Gym': 'bi-heart-pulse',
    'Restaurant': 'bi-restaurant',
    'Dining': 'bi-cup-hot',
    'Beach Access': 'bi-sun',
    'Business Center': 'bi-briefcase'
  };

  imageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/320x320?text=Image+Not+Found';
  }

  // A getter for the rating description
  get ratingText(): string {
    if (this.hotel.rating >= 9.0) return 'Exceptional';
    if (this.hotel.rating >= 8.5) return 'Excellent';
    if (this.hotel.rating >= 7.5) return 'Good';
    return 'Fair';
  }

  // A getter to get the icon for a feature string
  getFeatureIcon(feature: string): string {
    return this.featureIcons[feature] || 'bi-info-circle';
  }
}
