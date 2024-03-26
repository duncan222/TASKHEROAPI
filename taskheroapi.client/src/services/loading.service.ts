import { Injectable } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new Subject<boolean>();

  constructor() { }

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }

  // Show loading for a specified duration before hiding
  showForDuration(duration: number): void {
    this.show();
    timer(duration).subscribe(() => this.hide());
  }

  getLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
