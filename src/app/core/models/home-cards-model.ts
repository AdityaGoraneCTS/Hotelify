// home-card-models.ts

export interface DiscoverCards{
    id: string; // Changed from number to string
    title: string;
    image: string;
    type?: string;
}

export interface PopularCards{
    id: string; // Changed from number to string
    title: string;
    image: string;
    type?: string;
}

export interface UniqueCards{
    id: string; // Changed from number to string
    title: string;
    hotelName: string;
    city: string;
    rating: number;
    originalPrice: number;
    offerPrice: number;
    image: string;
    type?: string;
}

export interface TopDealCards{
    id: string; // Changed from number to string
    title: string;
    hotelName: string;
    city: string;
    rating: number;
    originalPrice: number;
    offerPrice: number;
    image: string;
    type?: string;
}