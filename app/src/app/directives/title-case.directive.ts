import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTitleCase]',
})
export class TitleCaseDirective {
  constructor(private element: ElementRef) {}

  @HostListener('keyup') onKeyup() {
    if (this.element.nativeElement.value) {
      const arr: string[] = this.element.nativeElement.value.split('');
      arr[0] = arr[0].toUpperCase();
      this.element.nativeElement.value = arr.join('');
    }
  }
}
