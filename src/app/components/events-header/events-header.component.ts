import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './events-header.component.html',
  styleUrl: './events-header.component.scss',
})
export class EventsHeaderComponent {
  @Input() title: string = '';
  @Input() startDate: number = 0;
  @Input() endDate: number = 0;
  @Input() backArrow: string = '';
}
