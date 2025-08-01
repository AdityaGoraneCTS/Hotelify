export interface HotelPolicies {
    checkInTime: string;   // e.g. '14:00'
    checkOutTime: string;  // e.g. '11:00'
    cancellationPolicy: string;
    smokingAllowed: boolean;
    petsAllowed: boolean;
}