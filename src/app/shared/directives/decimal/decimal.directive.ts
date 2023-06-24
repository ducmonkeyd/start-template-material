import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[decimalFormat],[DecimalFormat],[decimalformat],[decimal-format]'
})
export class DecimalDirective {
  @Input() decimalPlace : number;
  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete']; //'-',

  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if(this.decimalPlace){
      this.regex = new RegExp(`^\\d*\\.?\\d{0,${this.decimalPlace}}$` , 'g')
    }
    // Allow Backspace, tab, end, and home keys
    if (
      this.specialKeys.indexOf(e.key) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey))
    ) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), e.key == 'Decimal' ? '.' : e.key, current.slice(position)].join(
      ''
    );
    if (next && !String(next).match(this.regex)) {
      e.preventDefault();
    }
  }

  @HostListener('focusout')
  onFocusout(e: KeyboardEvent) {
    let current: string = this.el.nativeElement.value;
    let decimalVal = parseFloat(current);
    if (!!current) {
      this.el.nativeElement.value = !isNaN(decimalVal) ? decimalVal : '';
      this.el.nativeElement.dispatchEvent(new Event('input'));
    }
  }
}
