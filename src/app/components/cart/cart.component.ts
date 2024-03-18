import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import { isPlatformBrowser } from '@angular/common';
import { EventsPackage } from '../../interfaces/event';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [EventsComponent],
})
export class CartComponent {
  cart: EventsPackage[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const cartString = localStorage.getItem('cart');
      if (cartString) {
        this.cart = JSON.parse(cartString);
      }
    }
  }
}
