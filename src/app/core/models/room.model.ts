export interface Room {
    id: string;
    name: string; // e.g. 'Deluxe Room'
    description: string;
    price: number;
    maxGuests: number;
    bedType: string; // e.g. 'King', 'Queen', 'Twin'
    amenities: string[]; // e.g. ['WiFi', 'AC']
    images: string[];
    isAvailable: boolean;
    quantityAvailable: number;
}