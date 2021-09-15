import { Subject } from 'rxjs/Rx';
import {
  Directive,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import {
  takeUntil,
  map,
  filter,
  throttleTime,
  tap,
} from 'rxjs/operators';

@Directive({
  selector: '[appScrollPagination]',
})
export class AppScrollPaginationDirective
  implements AfterViewInit, OnDestroy
{
  private unsubscribe$: Subject<void> = new Subject();
  @Output() nextPage: EventEmitter<boolean> = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    fromEvent(this.elRef.nativeElement, 'scroll')
      .pipe(
        takeUntil(this.unsubscribe$),
        map((e: any) => ({
          isEnd:
            e.target.scrollHeight ===
              e.target.scrollTop + e.target.offsetHeight ||
            e.target.scrollHeight <=
              e.target.scrollTop + e.target.offsetHeight + 1,
        })),
        filter((e: {isEnd: boolean}) => e.isEnd),
        throttleTime(200)
      )
      .subscribe((e: any) => {
        this.nextPage.emit(true);
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
