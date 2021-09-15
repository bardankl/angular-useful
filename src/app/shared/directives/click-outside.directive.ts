import {
    Directive,
    HostListener,
    ElementRef,
    Renderer2,
    Input,
    Output,
    EventEmitter,
  } from '@angular/core';

@Directive({
    selector: '[appClickOutside]',
  })
  export class ClickOutsideDirective {
    @Input() somploClickOutside: string;
    private children: HTMLElement[];
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    @Output() close: EventEmitter<void> = new EventEmitter();
    @HostListener('document:click', ['$event']) onClick(e: MouseEvent) {
      this.children = [].slice.call(this.el.nativeElement.children);
      const elementToClose = this.findChild();
      const isCLickedInside = this.isCLickedInside(e);
      if (!isCLickedInside && elementToClose) {
        // this.renderer.setStyle(elementToClose, 'display', 'none');
        this.close.emit();
      }
    }
    private isCLickedInside(clickedElelement: any): boolean {
      const path = clickedElelement.composedPath();
      return (
        path.some((e: any) => e.id === this.somploClickOutside) ||
        this.el.nativeElement.contains(clickedElelement.target)
      );
    }
    private findChild(): HTMLElement {
      let elem: HTMLElement = null;
      this.children.forEach((el) => {
        if (el.id === this.somploClickOutside) {
          elem = el;
        }
      });
      return elem;
    }
  }
