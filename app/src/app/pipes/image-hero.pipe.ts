import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageHero',
})
export class ImageHero implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(img: any): unknown {
    if (!img) {
      img = 'assets/img/no-image.png';
    }

    return this.domSanitizer.bypassSecurityTrustStyle(
      `background-image: url('${img}')`
    );
  }
}
