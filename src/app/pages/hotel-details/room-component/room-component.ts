import { Component, Input } from '@angular/core';
import { Room } from '../../../core/models/hotel.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-room-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './room-component.html',
  styleUrl: './room-component.css'
})
export class RoomComponent {
  @Input() room!: Room;

  // Function to handle the "Reserve Now" action
  reserveRoom() {
    // Implement your reservation logic here
    console.log(`Reserving room: ${this.room.name}`);
    alert(`Reservation for ${this.room.name} initiated!`);
  }

  // Fallback image handling
  imageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/320x250?text=Room+Image';
  }
}
