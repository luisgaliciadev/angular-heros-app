import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AddComponent } from './pages/add/add.component';
import { SuperHeroComponent } from './pages/super-hero/super-hero.component';
import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/list/list.component';

import { SuperHerosRoutingModule } from './super-heros-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    AddComponent,
    SuperHeroComponent,
    MainComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SuperHerosRoutingModule,
    MaterialModule,
    ComponentsModule,
    PipesModule,
    SharedModule,
    DirectivesModule,
  ],
})
export class SuperHeroModule {}
