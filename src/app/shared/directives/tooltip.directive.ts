import {
    Directive,
    HostListener,
    ElementRef,
    Input,
    Renderer2,
  } from '@angular/core';

@Directive({
    selector: '[appTooltip]',
  })
  export class AppToolTipDirective {
    @Input('tooltipTitle') tooltipTitle: string;
    elementBodyClass = 'app-tooltip-element-body';
    parentElClass = 'app-tooltip-parent-position';
    toolTipElement: HTMLElement;
    isElementCreated = false;
    elementTag = 'span';
    private isClear = true;
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    @HostListener('mouseover', ['$event']) onMouseHover(event: MouseEvent) {
      if (this.isElementCreated) {
        return;
      }
      if (!this.isClear) {
        return;
      }
      this.buildTooltip(event);
    }
    @HostListener('mouseleave') hideTooltip() {
      this.isClear = true;
      this.removeToolTip();
      this.isElementCreated = false;
    }

    private buildTooltip(e: MouseEvent): void {
      const element = this.elRef.nativeElement;
      this.renderer.addClass(element, this.parentElClass);
      this.createToolTipElement();
    }
    private createToolTipElement(): void {
      this.toolTipElement = this.renderer.createElement(this.elementTag);
      this.renderer.setAttribute(this.toolTipElement, 'title', this.tooltipTitle);
      this.renderer.setAttribute(
        this.toolTipElement,
        'class',
        this.elementBodyClass
      );
      this.renderer.appendChild(this.elRef.nativeElement, this.toolTipElement);
      this.isElementCreated = true;
    }
    private removeToolTip(): void {
      this.renderer.removeChild(this.elRef.nativeElement, this.toolTipElement);
      this.renderer.removeClass(this.elRef.nativeElement, this.parentElClass);
    }
  }
//   .somplo-tooltip-element-body {
// }
// .somplo-tooltip-element-body:after {
//   background-color: #606060;
//   border-radius: 5px;
//   font-size: 12px;
//   font-family: 'Comfortaa';
//   line-height: 1.2em;
//   text-align: center;
//   bottom: 26px;
//   color: #fff;
//   content: attr(title);
//   text-decoration: none;
//   padding: 10px;
//   white-space: nowrap;
//   left: 50%;
//   -webkit-transform: translateX(-50%);
//   -moz-transform: translateX(-50%);
//   -ms-transform: translateX(-50%);
//   -o-transform: translateX(-50%);
//   transform: translateX(-50%);
//   position: absolute;
// }
// .somplo-tooltip-element-body:before {
//   border: solid;
//   border-color: #606060 transparent;
//   border-width: 6px 6px 0 6px;
//   bottom: 20px;
//   content: '';
//   left: 50%;
//   -webkit-transform: translateX(-50%);
//   -moz-transform: translateX(-50%);
//   -ms-transform: translateX(-50%);
//   -o-transform: translateX(-50%);
//   transform: translateX(-50%);
//   position: absolute;
// }
// .somplo-tooltip-parent-position {
//   position: relative;
// }
