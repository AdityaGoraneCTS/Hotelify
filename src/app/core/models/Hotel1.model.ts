export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: Address;
  type?: 'Hotel' | 'Apartment' | 'Villa' | 'Resort' | 'Cottage' | 'Cabin' | 'Guest House' | 'Hostel';
  features: string[]; // e.g., ['Swimming Pool', 'Spa']
  amenities: string[]; // e.g., ['Free WiFi', 'Parking']
  rating: number;
  reviews: number;
  images: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercentage?: number;
  totalPriceIncludesTaxes: number;
  isFullyRefundable: boolean; // Retained as it's a key financial policy
  hasFreeBreakfast: boolean;
  reserveNowPayLater: boolean;
  policies: HotelPolicies; // All policy details are here
  rooms: Room[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  // checkInTime and checkOutTime moved back into policies for logical grouping
  availabilityMessage?: string;
  managerId?: string; 
}
 
export interface Address {
  street: string;
  area?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}
 
// Updated HotelPolicies model
export interface HotelPolicies {
  checkInTime: string;    // e.g. '14:00'
  checkOutTime: string;   // e.g. '11:00'
  cancellationPolicy: string;
  smokingAllowed: boolean;
  petsAllowed: boolean; // This is the single source of truth for pets allowed
}
 
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  bedType: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  quantityAvailable: number;
}