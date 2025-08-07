// home-card.ts
import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DiscoverCards, PopularCards, TopDealCards, UniqueCards } from '../../../core/models/home-cards-model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeCardService } from './../../../core/services/home-card-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-card-component.html',
  styleUrls: ['./home-card-component.css']
})
export class HomeCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('propertyScroll') propertyScroll!: ElementRef;
  @ViewChild('popularScroll') popularScroll!: ElementRef;
  @ViewChild('homesScroll') homesScroll!: ElementRef;
  @ViewChild('dealsScroll') dealsScroll!: ElementRef;

  arrowVisibility = {
    property: { left: false, right: true },
    popular: { left: false, right: true },
    homes: { left: false, right: true },
    deals: { left: false, right: true },
  };

  propertyCards: DiscoverCards[] = [];
  cards: PopularCards[] = [];
  homesCards: UniqueCards[] = [];
  dealsCards: TopDealCards[] = [];

  private subscriptions = new Subscription();

  constructor(private hotelService: HomeCardService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.hotelService.getDiscoverCards().subscribe(data => {
        this.propertyCards = data;
      })
    );

    this.subscriptions.add(
      this.hotelService.getPopularCards().subscribe(data => {
        this.cards = data;
      })
    );

    this.subscriptions.add(
      this.hotelService.getUniqueCards().subscribe(data => {
        this.homesCards = data;
      })
    );

    this.subscriptions.add(
      this.hotelService.getTopDealCards().subscribe(data => {
        this.dealsCards = data;
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updatePropertyArrows();
      this.updatePopularArrows();
      this.updateHomesArrows();
      this.updateDealsArrows();
    }, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.updatePropertyArrows();
    this.updatePopularArrows();
    this.updateHomesArrows();
    this.updateDealsArrows();
  }

  private scrollSection(ref: ElementRef, direction: 'left' | 'right') {
    const container = ref.nativeElement;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  }

  scrollProperty(direction: 'left' | 'right') {
    this.scrollSection(this.propertyScroll, direction);
  }

  scrollPopular(direction: 'left' | 'right') {
    this.scrollSection(this.popularScroll, direction);
  }

  scrollHomes(direction: 'left' | 'right') {
    this.scrollSection(this.homesScroll, direction);
  }

  scrollDeals(direction: 'left' | 'right') {
    this.scrollSection(this.dealsScroll, direction);
  }

  private updateArrowVisibility(ref: ElementRef, section: keyof typeof this.arrowVisibility) {
    if (!ref || !ref.nativeElement) return;
    const container = ref.nativeElement;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    this.arrowVisibility[section].left = scrollLeft > 0;
    this.arrowVisibility[section].right = scrollLeft + clientWidth < scrollWidth - 1;
  }

  updatePropertyArrows() {
    this.updateArrowVisibility(this.propertyScroll, 'property');
  }

  updatePopularArrows() {
    this.updateArrowVisibility(this.popularScroll, 'popular');
  }

  updateHomesArrows() {
    this.updateArrowVisibility(this.homesScroll, 'homes');
  }

  updateDealsArrows() {
    this.updateArrowVisibility(this.dealsScroll, 'deals');
  }


  navigateToPropertyType(type: string): void {
    this.router.navigate(['/results'], { queryParams: { type: type } });
  }

  navigateToDestination(location: string): void {
    this.router.navigate(['/results'], { queryParams: { location: location } });
  }

  // FIX: Change the parameter type from 'number' to 'string'
  navigateToHotelDetails(hotelId: string): void {
    this.router.navigate(['/hotel-details', hotelId]);
  }


  navigateToLocation(location: string, id: string | null = null): void {
    const queryParams: any = {};
    if (location) {
      queryParams.location = location;
    }
    if (id) {
      queryParams.id = id;
    }
    this.router.navigate(['/results'], { queryParams });
  }

  getRatingText(rating: number): string {
    if (rating >= 4.5) {
      return 'Excellent';
    }
    if (rating >= 4.0) {
      return 'Recommended';
    }
    if (rating >= 3.5) {
      return 'Good';
    }
    return 'Rated';
  }
}