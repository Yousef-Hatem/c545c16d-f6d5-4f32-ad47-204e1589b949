import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearchFieldComponent } from './event-search-field.component';

describe('EventSearchFieldComponent', () => {
  let component: EventSearchFieldComponent;
  let fixture: ComponentFixture<EventSearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSearchFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
