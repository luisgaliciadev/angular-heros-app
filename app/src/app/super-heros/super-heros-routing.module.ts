import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SuperHeroComponent } from './pages/super-hero/super-hero.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: AddComponent },
      { path: 'ver/:id', component: SuperHeroComponent },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperHerosRoutingModule {}
