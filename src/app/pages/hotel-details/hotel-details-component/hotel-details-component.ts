import { CommonModule , } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Hotel } from '../../../core/models/hotel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../core/services/hotel-service';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { RoomComponent } from '../room-component/room-component';


@Component({
  selector: 'app-hotel-details-component',
  imports: [CommonModule,RoomComponent ],
  templateUrl: './hotel-details-component.html',
  styleUrl: './hotel-details-component.css'
})
export class HotelDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);

  hotel = signal<Hotel | undefined>(undefined);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const hotelId = params.get('id');
          if (hotelId) {
            return this.hotelService.getHotelById(hotelId);
          }
          return [];
        })
      )
      .subscribe({
        next: (hotelData) => {
          this.hotel.set(hotelData);
        },
        error: (err) => {
          console.error('Error fetching hotel details:', err);
          this.hotel.set(undefined); // Set to undefined on error
        }
      });
  }

  getRatingText(rating: number | undefined): string {
    if (rating === undefined) return 'No rating';
    if (rating >= 9.0) return 'Exceptional';
    if (rating >= 8.5) return 'Excellent';
    if (rating >= 7.5) return 'Good';
    return 'Fair';
  }

  getRatingClass(rating: number | undefined): string {
    if (rating === undefined) return 'text-muted';
    if (rating >= 9.0) return 'text-success';
    if (rating >= 8.5) return 'text-info';
    if (rating >= 7.5) return 'text-warning';
    return 'text-danger';
  }
}
