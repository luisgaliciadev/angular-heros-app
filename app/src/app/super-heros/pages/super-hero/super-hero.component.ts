import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { SuperHerosService } from 'src/app/services/super-heros.service';

import { SuperHero } from '../../../shared/interfaces/super-hero.interface';

@Component({
  selector: 'app-super-hero',
  templateUrl: './super-hero.component.html',
  styles: [],
})
export class SuperHeroComponent implements OnInit {
  superHero: SuperHero = {} as SuperHero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private SuperHerosService: SuperHerosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.SuperHerosService.getSuperHeroById(id)))
      .subscribe((superHero) => (this.superHero = superHero));
  }
}
