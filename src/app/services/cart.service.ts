import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventsPackage } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartBehaviorSubject: BehaviorSubject<EventsPackage[] | null> =
    new BehaviorSubject<any>(null);

  constructor() {}

  getCart(): Observable<EventsPackage[] | null> {
    return this.cartBehaviorSubject.asObservable();
  }

  setCart(cart: EventsPackage[]): void {
    this.cartBehaviorSubject.next(cart);
  }
}
