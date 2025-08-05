export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  features: string[];
  type?: 'Hotel' | 'Apartment' | 'Villa' | 'Resort' | 'Cottage' | 'Cabin' | 'Guest House' | 'Hostel'; 
  isFullyRefundable: boolean;
  isPetFriendly?: boolean;
  hasFreeBreakfast?: boolean;
  reserveNowPayLater?: boolean;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage?: number;
  totalPriceIncludesTaxes: number;
  images: string[];
  availabilityMessage?: string;
}