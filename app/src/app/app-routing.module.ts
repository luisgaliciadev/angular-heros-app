import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'super-heros',
  },
  {
    path: 'super-heros',
    loadChildren: () =>
      import('./super-heros/super-heros.module').then((m) => m.SuperHeroModule),
  },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
