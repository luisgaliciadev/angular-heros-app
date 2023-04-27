import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from '../shared/material/material.module';
import { SuperHeroCardComponent } from './super-hero-card/super-hero-card.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [SuperHeroCardComponent, ModalConfirmComponent],
  exports: [SuperHeroCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    PipesModule,
  ],
})
export class ComponentsModule {}
