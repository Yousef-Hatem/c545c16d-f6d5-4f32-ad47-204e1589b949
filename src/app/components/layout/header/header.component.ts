import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { EventSearchFieldComponent } from './event-search-field/event-search-field.component';
import { EventsPackage } from '../../../interfaces/event';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    EventSearchFieldComponent,
    RouterModule,
  ],
})
export class HeaderComponent {
  badge: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cartService: CartService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const cartString = localStorage.getItem('cart');
      if (cartString) {
        const cart = JSON.parse(cartString);
        this.setCartBadge(cart);
      }
    }
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      if (cart) {
        this.setCartBadge(cart);
      }
    });
  }

  setCartBadge(cart: EventsPackage[]): void {
    this.badge = 0;

    cart.forEach(
      (eventsPackage) => (this.badge += eventsPackage.events.length),
    );
  }
}
