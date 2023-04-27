import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleCaseDirective } from './title-case.directive';

@NgModule({
  declarations: [TitleCaseDirective],
  exports: [TitleCaseDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
