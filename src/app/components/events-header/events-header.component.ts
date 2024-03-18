import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-header.component.html',
  styleUrl: './events-header.component.scss',
})
export class EventsHeaderComponent {
  constructor() {}

  @Input() title: string = '';
  @Input() startDate: number = 0;
  @Input() endDate: number = 0;
}
