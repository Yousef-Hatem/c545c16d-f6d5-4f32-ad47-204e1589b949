import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-search-field',
  standalone: true,
  imports: [MatInputModule, MatIconModule],
  templateUrl: './event-search-field.component.html',
  styleUrl: './event-search-field.component.scss',
})
export class EventSearchFieldComponent {}
