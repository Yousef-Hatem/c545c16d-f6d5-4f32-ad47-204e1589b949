import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  @Input() event!: Event;
}
