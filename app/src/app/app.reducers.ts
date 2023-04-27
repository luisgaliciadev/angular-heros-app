import { ActionReducerMap } from '@ngrx/store';

import { SuperHero } from './shared/interfaces/super-hero.interface';

import * as fromSuperHeroReducer from './super-heros/super-heros.reducer';

export interface AppState {
  superHeros: SuperHero[];
}

export const appReducers: ActionReducerMap<AppState, any> = {
  superHeros: fromSuperHeroReducer.superHeroReducer,
};
