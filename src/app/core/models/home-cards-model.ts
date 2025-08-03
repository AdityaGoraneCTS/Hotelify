export interface DiscoverCards{
    id:number
    title:string
    image:string
    type?: string;
}
 
export interface PopularCards{
    id:number
    title:string
    image:string
    type?: string;
}
 
export interface UniqueCards{
    id:number
    title:string
    hotelName:string
    city:string
    rating:number
    originalPrice:number
    offerPrice:number
    image:string
    type?: string;
}
 
export interface TopDealCards{
    id:number
    title:string
    hotelName:string
    city:string
    rating:number
    originalPrice:number
    offerPrice:number
    image:string
    type?: string;
}