import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [ErrorPageComponent, NavbarComponent],
  exports: [ErrorPageComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class SharedModule {}
