import { TestBed } from '@angular/core/testing';

import { EventSearchService } from './event-search.service';

describe('EventSearchService', () => {
  let service: EventSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
