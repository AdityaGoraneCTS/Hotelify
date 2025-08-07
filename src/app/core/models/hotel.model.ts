export interface Address {
  street: string;
  area?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface HotelPolicies {
  checkInTime: string;  // e.g. '14:00'
  checkOutTime: string; // e.g. '11:00'
  cancellationPolicy: string;
  smokingAllowed: boolean;
  petsAllowed: boolean;
}

export interface Room {
  id: string;
  name: string; // e.g. 'Deluxe Room'
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage?: number;
  totalPriceIncludesTaxes: number;
  maxGuests: number;
  bedType: string; // e.g. 'King', 'Queen', 'Twin'
  amenities: string[]; // e.g. ['WiFi', 'AC']
  images: string[];
  isAvailable: boolean;
  quantityAvailable: number;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: Address;
  type?: 'Hotel' | 'Apartment' | 'Villa' | 'Resort' | 'Cottage' | 'Cabin' | 'Guest House' | 'Hostel' | 'Palace';
  features: string[]; // e.g., ['Swimming Pool', 'Spa']
  amenities: string[]; // e.g., ['Free WiFi', 'Parking']
  rating: number;
  reviews: number;
  images: string[];
  primaryImage?:string;
  isFullyRefundable: boolean;
  hasFreeBreakfast: boolean;
  reserveNowPayLater: boolean;
  policies: HotelPolicies;
  rooms: Room[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  availabilityMessage?: string;
  managerId?: string;
}