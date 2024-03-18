import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import { EventService } from '../../services/event.service';
import { Event, EventsPackage } from '../../interfaces/event';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [EventsComponent],
})
export class HomeComponent {
  events: Event[] = [];
  loading: boolean = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventService: EventService,
  ) {
    const events = this.getEventsFromLocalStorage();

    if (events) {
      this.events = events;
      this.loading = false;
    }

    this.eventService.getEvents().subscribe((events) => {
      if (isPlatformBrowser(this.platformId)) {
        this.events = this.removeEventsInCartFromEvents(events);
        this.loading = false;
        this.setEventsInToLocalStorage();
      }
    });
  }

  removeEventsInCartFromEvents(events: Event[]): Event[] {
    let cartString = localStorage.getItem('cart');

    if (cartString) {
      const cart: EventsPackage[] = JSON.parse(cartString);

      events = events.filter((event) => {
        const id = event._id;
        let eventFound: boolean = false;

        cart.forEach((eventsPackage) => {
          if (!eventFound) {
            eventsPackage.events.forEach((event) => {
              if (!eventFound && id === event._id) {
                eventFound = true;
              }
            });
          }
        });

        return !eventFound;
      });
    }
    return events;
  }

  setEventsInToLocalStorage(): void {
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  getEventsFromLocalStorage(): Event[] | null {
    if (isPlatformBrowser(this.platformId)) {
      const eventsString: string | null = localStorage.getItem('events');

      if (eventsString) {
        const events: Event[] = JSON.parse(eventsString);
        return events;
      }
    }
    return null;
  }
}
