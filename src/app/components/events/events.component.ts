import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { Event, EventsPackage } from '../../interfaces/event';
import { EventService } from '../../services/event.service';
import { EventComponent } from '../event/event.component';
import { EventSearchService } from '../../services/event-search.service';
import { cloneDeep } from 'lodash';
import { EventsHeaderComponent } from '../events-header/events-header.component';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  imports: [EventComponent, EventsHeaderComponent],
})
export class EventsComponent {
  originalEventsPackages: EventsPackage[] = [];
  eventsPackages: EventsPackage[] = [];
  loading: boolean = true;

  constructor(
    private eventService: EventService,
    private eventSearchService: EventSearchService,
    private cartService: CartService,
  ) {
    this.eventService.getEvents().subscribe((events) => {
      events = this.removeEventsInCartFromEvents(events);

      this.setEventsPackages(events);

      this.eventSearchService.getSearch().subscribe((search) => {
        this.filteredEvents(search);
      });

      this.loading = false;
    });
  }

  setEventsPackages(events: Event[]): void {
    let packages: EventsPackage[] = [];
    const recordedDates: string[] = [];

    events.forEach((event) => {
      if (this.checkEvent(event)) {
        const eventDate = event.date.split('T')[0];
        const packageIndex = recordedDates.indexOf(eventDate);

        event = this.changeFormatOfStartAndEndTime(event);

        if (packageIndex !== -1) {
          packages[packageIndex].events.push(event);
        } else {
          const time = new Date(eventDate).getTime();
          const date = this.transformDate(eventDate);
          const events = [event];

          packages.push({ time, date, events });
          recordedDates.push(eventDate);
        }
      }
    });

    packages.sort((a, b) => {
      const dateA = a.time;
      const dateB = b.time;
      return dateB - dateA;
    });

    packages = this.setPriorityForEventsPackages(packages);

    this.eventsPackages = packages;
    this.originalEventsPackages = cloneDeep(packages);
  }

  transformDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return date
      .toLocaleDateString('en-US', options)
      .toUpperCase()
      .replaceAll(',', '');
  }

  changeFormatOfStartAndEndTime(event: Event): Event {
    if (event.startTime && event.endTime) {
      event.endTime = event.endTime.replace('T', ' ').split('.')[0];
      event.startTime = event.startTime.replace('T', ' ').split('.')[0];
    }
    return event;
  }

  checkEvent(event: Event): boolean {
    return !!event.flyerFront;
  }

  setPriorityForEventsPackages(
    eventsPackages: EventsPackage[],
  ): EventsPackage[] {
    let numberModifiedEvents = 4;
    return eventsPackages.map((eventsPackage: EventsPackage) => {
      eventsPackage.events = eventsPackage.events.map((event: Event) => {
        if (numberModifiedEvents) {
          event.priority = true;
          numberModifiedEvents--;
        } else {
          event.priority = false;
        }
        return event;
      });
      return eventsPackage;
    });
  }

  filteredEvents(search: string) {
    let eventsPackages = cloneDeep(this.originalEventsPackages);

    eventsPackages = eventsPackages.map((eventsPackage: EventsPackage) => {
      eventsPackage.events = eventsPackage.events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase()),
      );
      return eventsPackage;
    });

    this.eventsPackages = eventsPackages.filter(
      (eventsPackage: EventsPackage) => eventsPackage.events.length > 0,
    );
  }

  removeEvent(eventsPackageIndex: number, eventIndex: number): void {
    this.originalEventsPackages[eventsPackageIndex].events.splice(
      eventIndex,
      1,
    );

    if (this.originalEventsPackages[eventsPackageIndex].events.length === 0) {
      this.originalEventsPackages.splice(eventsPackageIndex, 1);
    }

    this.eventsPackages = cloneDeep(this.originalEventsPackages);
  }

  addToCart(eventsPackageIndex: number, eventIndex: number): void {
    const cartString = localStorage.getItem('cart');
    const eventsPackage = this.eventsPackages[eventsPackageIndex];
    const event = eventsPackage.events[eventIndex];
    let cart: EventsPackage[] = [];

    const newEventsPackage = {
      time: eventsPackage.time,
      date: eventsPackage.date,
      events: [event],
    };

    if (cartString) {
      let eventsPackageExist: boolean = false;
      cart = JSON.parse(cartString);

      cart = cart.map((item) => {
        if (item.time === eventsPackage.time) {
          eventsPackageExist = true;
          item.events.push(event);
        }
        return item;
      });

      if (!eventsPackageExist) {
        cart.push(newEventsPackage);
      }
    } else {
      cart = [newEventsPackage];
    }

    this.cartService.setCart(cart);
    localStorage.setItem('cart', JSON.stringify(cart));

    this.removeEvent(eventsPackageIndex, eventIndex);
  }

  removeEventsInCartFromEvents(events: Event[]): Event[] {
    const cartString = localStorage.getItem('cart');

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
}
