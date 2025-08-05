import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  inject,
  signal,
  effect,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { LocationService } from '../../../core/services/location-service';

// Custom validator function for date range
export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const checkIn = control.get('checkIn')?.value;
  const checkOut = control.get('checkOut')?.value;

  // Only validate if both dates are present
  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    // Check if check-out date is not after check-in date
    return checkOutDate > checkInDate ? null : { dateMismatch: true };
  }

  // No dates selected, so no validation error
  return null;
};

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})

export class SearchBarComponent {
  private fb = inject(FormBuilder);
  private locationService = inject(LocationService);
  private router = inject(Router);

  @ViewChild('locationContainer') locationContainer!: ElementRef;
  @ViewChild('guestsContainer') guestsContainer!: ElementRef;

  searchForm: FormGroup = this.fb.group({
    location: ['', Validators.required],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    guestsRooms: ['', Validators.required],
  }, {
    // Add the custom validator to the form group
    validators: dateRangeValidator
  });

  filteredLocations: string[] = [];

  guests = signal(1);
  rooms = signal(1);
  isGuestDropdownOpen = signal(false);

  constructor() {
    effect(() => {
      const locationCtrl = this.searchForm.get('location');
      if (locationCtrl) {
        locationCtrl.valueChanges
          .pipe(
            debounceTime(300),
            switchMap(query => this.locationService.getLocationSuggestions(query || ''))
          )
          .subscribe(locations => this.filteredLocations = locations);
      }
    });
  }

  selectLocation(loc: string): void {
    this.searchForm.get('location')?.setValue(loc);
    this.filteredLocations = [];
  }

  toggleGuestDropdown(): void {
    this.isGuestDropdownOpen.update(value => !value);
  }

  adjustGuests(change: number): void {
    this.guests.update(value => Math.max(1, value + change));
  }

  adjustRooms(change: number): void {
    this.rooms.update(value => Math.max(1, value + change));
  }

  confirmGuestsRooms(): void {
    const label = `${this.guests()} guests, ${this.rooms()} rooms`;
    this.searchForm.get('guestsRooms')?.setValue(label);
    this.isGuestDropdownOpen.set(false);
  }

  onSearch(): void {
    if (this.searchForm.invalid) return;
    const queryParams = {

      location: this.searchForm.get('location')?.value,
     
    };
    this.router.navigate(['/search-results'], { queryParams });
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: EventTarget | null): void {
    if (target instanceof HTMLElement) {
      if (!this.locationContainer?.nativeElement.contains(target)) {
        this.filteredLocations = [];
      }
      if (!this.guestsContainer?.nativeElement.contains(target)) {
        this.isGuestDropdownOpen.set(false);
      }
    }
  }
}