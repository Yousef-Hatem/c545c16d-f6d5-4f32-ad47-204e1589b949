import { EventSearchService } from './../../../../services/event-search.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-search-field',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatIconModule],
  templateUrl: './event-search-field.component.html',
  styleUrl: './event-search-field.component.scss',
})
export class EventSearchFieldComponent {
  search: string = '';

  constructor(private eventSearchService: EventSearchService) {}

  sendSearchText() {
    this.eventSearchService.sendSearch(this.search);
  }
}
