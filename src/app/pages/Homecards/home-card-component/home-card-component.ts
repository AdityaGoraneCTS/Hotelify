import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DiscoverCards, PopularCards, TopDealCards, UniqueCards } from '../../../core/models/home-cards-model';
import { CardsService } from '../../../core/services/home-card-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-home-card-component',
  imports: [CommonModule],
  templateUrl: './home-card-component.html',
  styleUrl: './home-card-component.css'
})
export class HomeCardComponent {
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

  constructor(private cardsService: CardsService, private router: Router) { }

  ngOnInit(): void {
    this.propertyCards = this.cardsService.getDiscoverCards();
    this.cards = this.cardsService.getPopularCards();
    this.homesCards = this.cardsService.getUniqueCards();
    this.dealsCards = this.cardsService.getTopDealCards();
  }

  ngAfterViewInit(): void {
    // A small delay to ensure view is rendered before checking arrows
    setTimeout(() => {
      this.updatePropertyArrows();
      this.updatePopularArrows();
      this.updateHomesArrows();
      this.updateDealsArrows();
    }, 0);
  }

  ngOnDestroy(): void {
    // Since (scroll) is used in the template, Angular handles listener cleanup.
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
    if (!ref) return;
    const container = ref.nativeElement;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    this.arrowVisibility[section].left = scrollLeft > 0;
    this.arrowVisibility[section].right = scrollLeft + clientWidth < scrollWidth - 1; // 1px tolerance
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

  // Use this single method for all card clicks
  navigateToLocation(location: string, id: number | null = null): void {
    if (location) {
      this.router.navigate(['/results'], { queryParams: { location: location } });
    } else {
      // Fallback for cases where location is not provided
      this.router.navigate(['/results']);
    }
  }

  // The goToDetails method is now obsolete if all cards navigate to the results page
  // If you still need it, here is a corrected version:
  // goToDetails(id: number) {
  //   alert(`Clicked on Card ${id}`);
  // }

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