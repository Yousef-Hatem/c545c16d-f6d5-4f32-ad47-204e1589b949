import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  @Input() event!: Event;
  @Input() cartMode: boolean = false;

  @Output() addToCartEvent = new EventEmitter();
  @Output() removeFromCartEvent = new EventEmitter();
  @Output() imageErrorEvent = new EventEmitter();

  imageError(): void {
    this.imageErrorEvent.emit();
  }

  addToCart(): void {
    this.addToCartEvent.emit();
  }

  removeFromCart(): void {
    this.removeFromCartEvent.emit();
  }
}
