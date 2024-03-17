import { Component } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventService } from '../../services/event.service';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  imports: [EventComponent],
})
export class EventsComponent {
  eventsPackages: Array<{ time: number; date: string; events: Event[] }> = [];

  constructor(private eventService: EventService) {
    eventService.getEvents().subscribe((data) => {
      this.setEventsPackages(data);
    });
  }

  setEventsPackages(events: Event[]): void {
    const packages: Array<{ time: number; date: string; events: Event[] }> = [];
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

    this.eventsPackages = packages;
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
}