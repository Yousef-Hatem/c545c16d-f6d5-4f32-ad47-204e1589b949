import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventSearchService {
  private searchSubject = new Subject<any>();

  sendSearch(data: any) {
    this.searchSubject.next(data);
  }

  getSearch() {
    return this.searchSubject.asObservable();
  }
}
