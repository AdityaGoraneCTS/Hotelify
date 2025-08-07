import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  imports: [CommonModule, FormsModule],
})
export class FilterComponent {
  // Price range slider values
  minPrice: number = 500;
  maxPrice: number = 20000;
  selectedMinPrice: number = 2000;
  selectedMaxPrice: number = 15000;
  priceGap: number = 1000;

  // Z-index for sliders to ensure the active one is on top
  minSliderZIndex: number = 3;
  maxSliderZIndex: number = 3;

  // Popular filters data
  popularFilters = [
    { name: '5 stars', count: 15, checked: false },
    { name: '4 stars', count: 28, checked: false },
    { name: 'Free cancellation', count: 65, checked: false },
    { name: 'Book without credit card', count: 82, checked: false },
    { name: 'Breakfast included', count: 45, checked: false },
    { name: 'Swimming pool', count: 32, checked: false },
    { name: 'Free WiFi', count: 95, checked: false },
    { name: 'Parking', count: 78, checked: false },
  ];

  constructor() { }

  // Method to handle price range changes
  handleMinInput() {
    if (this.selectedMinPrice > this.selectedMaxPrice - this.priceGap) {
      this.selectedMinPrice = this.selectedMaxPrice - this.priceGap;
    }
    this.logPriceChange();
  }

  handleMaxInput() {
    if (this.selectedMaxPrice < this.selectedMinPrice + this.priceGap) {
      this.selectedMaxPrice = this.selectedMinPrice + this.priceGap;
    }
    this.logPriceChange();
  }

  logPriceChange() {
    console.log(`Price range updated: ₹${this.selectedMinPrice} - ₹${this.selectedMaxPrice}+`);
  }

  // Getter for dynamic progress bar styling
  get progressStyle() {
    const minPercent = ((this.selectedMinPrice - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
    const maxPercent = ((this.selectedMaxPrice - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;

    return {
      'left': `${minPercent}%`,
      'right': `${100 - maxPercent}%`
    };
  }

  // Method to handle checkbox changes
  onFilterChange(filter: { name: string; checked: boolean }) {
    // You can add logic here to filter results based on the new selection
    console.log(`${filter.name} is now ${filter.checked ? 'checked' : 'unchecked'}`);
  }

  // Set z-index to bring the active slider to the front
  setMinSliderOnTop() {
    this.minSliderZIndex = 5;
    this.maxSliderZIndex = 3;
  }

  setMaxSliderOnTop() {
    this.minSliderZIndex = 3;
    this.maxSliderZIndex = 5;
  }
}