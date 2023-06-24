import { Directive, ElementRef, HostListener, Input, OnInit, DoCheck, EventEmitter, Output } from '@angular/core';
import { Configs } from '@app/shared/common/configs/configs';

import '@app/core/prototype/string-prototype';

@Directive({
  selector: '[currency-format],[currencyFormat]'
})
export class CurrencyFormatDirective implements OnInit, DoCheck {
  private el: any;
  private isDoChecked: boolean;
  @Output() valueChanged: EventEmitter<number> = new EventEmitter();
  @Input() acceptZero: boolean;
  @Input() allowNegative: boolean;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    const outvalue = Number(this.el.value);
    this.el.value = Number.isNaN(outvalue) ? '' : Configs.TransformCurrency(this.el.value);
  }

  ngDoCheck(): void {
    if (this.el.value === '-') return;
    if (!!this.el.value /*&& !this.isDoChecked*/) {
      let outValue = this.el.value.replaceAll(Configs.THOUSANDS_SEPARATOR, Configs.BLANK);
      let numberData = Number(outValue);
      let i = 3;
      let pos = this.el.selectionStart;
      let index = (this.el.value.match(/,/g) || []).length;
      while (parseInt((Math.abs(numberData) / 1000).toString()) > 0) {
        let head = outValue.slice(0, outValue.length - i);
        let tail = outValue.slice(outValue.length - i, outValue.length);
        outValue = head + ',' + tail;
        numberData = parseInt((numberData / 1000).toString());
        if (index <= 0) {
          pos = pos + 1;
        }
        index--;
        i = i + 4;
      }
      this.el.value = outValue;
      this.el.setSelectionRange(pos, pos, 'none');
      this.isDoChecked = true;
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    let e = <KeyboardEvent>event;
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    // opossite of transform
    const outvalue = Number(value.replaceAll(Configs.THOUSANDS_SEPARATOR, ''));
    this.el.value = Number.isNaN(outvalue) ? '' : Configs.ParseCurrency(value);
  }

  private formatTimeout: any;
  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string | number) {
    if (value == 0 && this.acceptZero == true) {
      return;
    }

    if (this.formatTimeout) {
      clearTimeout(this.formatTimeout);
    }
    this.parseIntValue();
  }

  parseIntValue() {
    if (
      !this.el.value ||
      this.el.value == '-' ||
      !this.el.value ||
      this.el.value == ''
    ) {
      return;
    }
    let current: string = `${this.el.value}`;
    current = current.replaceAll(Configs.THOUSANDS_SEPARATOR, Configs.BLANK);
    let intVal = parseInt(current);
    if (!!current) {
      this.el.value = !isNaN(intVal) ? (this.allowNegative ? intVal : intVal >= 0 ? intVal : '') : '';
      this.el.dispatchEvent(new Event('input'));
    }
  }
}
