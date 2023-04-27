import { Action } from '@ngrx/store';
import { SuperHero } from '../shared/interfaces/super-hero.interface';

export const INIT_SUPER_HERO = '[Super Héroe] Init Super Héroe';
export const ADD_SUPER_HERO = '[Super Héroe] Agregar Super Héroe';
export const DELETE_SUPER_HERO = '[Super Héroe] Borrar Super Héroe';

export class initSuperHeroAction implements Action {
  readonly type = INIT_SUPER_HERO;
  constructor(public superHero: SuperHero[]) {}
}

export class addSuperHeroAction implements Action {
  readonly type = ADD_SUPER_HERO;
  constructor(public superHero: SuperHero[]) {}
}

export class deleteSuperHeroAction implements Action {
  readonly type = DELETE_SUPER_HERO;
  constructor(public id: string) {}
}

export type Acciones =
  | initSuperHeroAction
  | addSuperHeroAction
  | deleteSuperHeroAction;
