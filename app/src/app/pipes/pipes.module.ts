import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageHero } from './image-hero.pipe';

@NgModule({
  declarations: [ImageHero],
  imports: [CommonModule],
  exports: [ImageHero],
})
export class PipesModule {}
