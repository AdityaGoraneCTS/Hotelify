import { Address } from './address.model';
import { Room } from './room.model';
import { HotelPolicies } from './hotel-policies.model';
import { HotelType } from './hotel-type.model';

export interface Hotel {
    id: string;
    name: string;
    description: string;
    type: HotelType; // e.g. 'Villa', 'Resort', etc.
    address: Address;
    location: {
        city: string;
        state: string;
        country: string;
        latitude: number;
        longitude: number;
    };
    images: string[]; // image URLs
    amenities: string[]; // e.g. ['WiFi', 'Pool', 'Parking']
    policies: HotelPolicies;
    contact: {
        phone: string;
        email: string;
        website?: string;
    };
    rating: number; // 1 to 5 stars
    reviewsCount: number;
    pricePerNight: number;
    discountedPrice:number;
    currency: string; // e.g. 'INR'
    availableRooms: Room[];
    managerId: string; // hotel admin
    createdAt: string;
    updatedAt: string;
}