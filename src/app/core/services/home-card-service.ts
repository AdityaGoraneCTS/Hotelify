import { DiscoverCards, PopularCards, TopDealCards, UniqueCards } from '../models/home-cards-model';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class CardsService {
  // DiscoverCards - NOW WITH 'type' PROPERTY
  discoverCards: DiscoverCards[] = [
    { id: 1, title: 'Hotels', type: 'Hotel', image: 'https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=' },
    { id: 2, title: 'Apartments', type: 'Apartment', image: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=' },
    { id: 3, title: 'Resorts', type: 'Resort', image: 'https://r-xx.bstatic.com/xdata/images/hotel/263x210/595551044.jpeg?k=262826efe8e21a0868105c01bf7113ed94de28492ee370f4225f00d1de0c6c44&o=' },
    { id: 4, title: 'Villas', type: 'Villa', image: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/620168315.jpeg?k=300d8d8059c8c5426ea81f65a30a7f93af09d377d4d8570bda1bd1f0c8f0767f&o=' },
    { id: 5, title: 'Cabins', type: 'Cabin', image: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595549239.jpeg?k=ad5273675c516cc1efc6cba2039877297b7ad2b5b3f54002c55ea6ebfb8bf949&o=' },
    { id: 6, title: 'Cottages', type: 'Cottage', image: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550000.jpeg?k=71eeb3e0996d7f734e57a6fa426c718749a36df768ca5d2fb1dc65fcd7483c1d&o=' },
    { id: 7, title: 'Glamping', type: 'Glamping', image: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450090.jpeg?k=52f6b8190edb5a9c91528f8e0f875752ce55a6beb35dc62873601e57944990e4&o=' },
    { id: 8, title: 'Guest House', type: 'Guest House', image: 'https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550178.jpeg?k=1db9bffadd03a0f2a9f0a06ba6c7751b16465f2dd251738f229d7a57dca799ef&o=' },
    { id: 9, title: 'Holiday Parks', type: 'Holiday Park', image: 'https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550306.jpeg?k=00c1d9a10179cc21b1e7e2ad1429ac21a5e779f258cf4cf66ddce30d618c05c9&o=' }
  ];
 
  // PopularCards
  popularCards:PopularCards[]=[
    { id: 1, title: 'Chennai', image: 'https://r-xx.bstatic.com/xdata/images/city/170x136/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o=' },
    { id: 2, title: 'Hyderabad', image: 'https://r-xx.bstatic.com/xdata/images/city/170x136/684653.jpg?k=306ccafcc8a4a7e23b9e8a05b183453fe885b312a4daa5ce76ec39a1b79cbc6f&o=' },
    { id: 3, title: 'Mumbai', image: 'https://r-xx.bstatic.com/xdata/images/city/170x136/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=' },
    { id: 4, title: 'New Delhi', image: 'https://q-xx.bstatic.com/xdata/images/city/170x136/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=' },
    { id: 5, title: 'Bangaluru', image: 'https://r-xx.bstatic.com/xdata/images/city/170x136/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=' },
    { id: 6, title: 'Pondicherry', image: 'https://tse2.mm.bing.net/th/id/OIP.Hx1X5PvzM6HtCYY5NFZSpwHaE8?w=272&h=181&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3' },
    { id: 7, title: 'Pune', image: 'https://q-xx.bstatic.com/xdata/images/city/170x136/684822.jpg?k=8e3dfdbe7474b16f993bead046bb1d3d329cdd68c6aee6ec72c8e935ba426a9f&o=' }
  ];
 
  //UniqueCards
  uniqueCards:UniqueCards[]=[
    {
      id: 1,
      title: 'Cozy Cottage',
      hotelName: 'Green Leaf Resort',
      city: 'Ooty',
      rating: 4.5,
      originalPrice: 41500,
      offerPrice: 27999,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=',
      type: 'Cottage'
    },
    {
      id: 2,
      title: 'Modern Loft',
      hotelName: 'Urban Stay',
      city: 'Mumbai',
      rating: 4.2,
      originalPrice: 59200,
      offerPrice: 39499,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/579099936.webp?k=e04cc7f7fe864ce09b7d7d978dbb7db3e558038a2151eb7c4c11e895bafbd8c0&o=',
      type: 'Apartment'
    },
    {
      id: 3,
      title: 'Beachside Villa',
      hotelName: 'Goa Getaway',
      city: 'Goa',
      rating: 4.8,
      originalPrice: 50200,
      offerPrice: 31499,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/438349362.webp?k=f67f0e7e54be1c0678f18cf9ae1271c4220a487901ae0bf906fed8ba0265e38d&o=',
      type: 'Villa'
    },
    {
      id: 4,
      title: 'Mountain Retreat',
      hotelName: 'Himalayan View',
      city: 'Manali',
      rating: 3.8,
      originalPrice: 59200,
      offerPrice: 35499,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/270323047.webp?k=bade09d7901e1282156f13c3b39e3a8b9c8d45170b2f1184565d3fc304c42d70&o=',
      type: 'Resort'
    },
    {
      id: 5,
      title: 'City Center Apartment',
      hotelName: 'Delhi Dreams',
      city: 'New Delhi',
      rating: 4.0,
      originalPrice: 51200,
      offerPrice: 30499,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square600/315744989.webp?k=37badff3959da24cbe900d0f8409b0a945943afe4e28bdfdaa3264bde915fae2&o=',
      type: 'Apartment'
    },
  ];
 
  //TopDealCards
  topDealCards:TopDealCards[]=[
    {
      id: 1,
      title: 'Weekend Special',
      hotelName: 'Sunset Inn',
      city: 'Chennai',
      rating: 4.0,
      originalPrice: 4000,
      offerPrice: 2499,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square240/329177887.jpg?k=0f9922dd4b1d3a52f2796c3a0037d21b7aadfa966fb0bac4ad886414c30a0b2e&o=',
      type: 'Hotel'
    },
    {
      id: 2,
      title: 'Last Minute',
      hotelName: 'Ocean Breeze Hotel',
      city: 'Pondicherry',
      rating: 3.9,
      originalPrice: 3800,
      offerPrice: 1999,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square240/696996922.jpg?k=a9c4cc0b64e5d761cc69dbaf45250a29ec9d2efb6e405233d35d519e037af8bf&o=',
      type: 'Resort'
    },
    {
      id: 3,
      title: 'Secret Escape',
      hotelName: 'Jaipur Jewels',
      city: 'Jaipur',
      rating: 4.8,
      originalPrice: 3800,
      offerPrice: 1999,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square240/459880008.jpg?k=ad55866ad0cf6be42177fe9134de8a786347dfbef6bc2505c5281b3ed9a932cb&o=',
      type: 'Hotel'
    },
    {
      id: 4,
      title: 'City Break',
      hotelName: 'Bangalore Bliss',
      city: 'Bangaluru',
      rating: 4.1,
      originalPrice: 3800,
      offerPrice: 1999,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square240/679158338.jpg?k=f974496125d64fe6e1f0b6a114b40e6b4a669dfe49df58b20ab97617d89e86b6&o=',
      type: 'Hotel'
    },
    {
      id: 5,
      title: 'Budget Friendly',
      hotelName: 'Hyderabad Stays',
      city: 'Hyderabad',
      rating: 3.8,
      originalPrice: 3800,
      offerPrice: 1999,
      image: 'https://cf.bstatic.com/xdata/images/hotel/square240/645356598.jpg?k=1ee839d5595e8e328dd776570ec4c16068abff05c9614c046ef37c9ec854cbcb&o=',
      type: 'Hotel'
    },
  ];
 
  getDiscoverCards(){
    return this.discoverCards;
  }
 
  getPopularCards(){
    return this.popularCards;
  }
 
  getUniqueCards(){
    return this.uniqueCards;
  }
 
  getTopDealCards(){
    return this.topDealCards;
  }
}