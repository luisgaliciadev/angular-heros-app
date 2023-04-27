import * as fromSuperHero from './super-heros.actions';
import { SuperHero } from '../shared/interfaces/super-hero.interface';

const initState: SuperHero[] = [];

export function superHeroReducer(
  state = initState,
  action: fromSuperHero.Acciones
): SuperHero[] {
  switch (action.type) {
    case fromSuperHero.INIT_SUPER_HERO:
      return action.superHero.map((superHero) => {
        return {
          ...superHero,
        };
      });

    case fromSuperHero.ADD_SUPER_HERO:
      return [
        ...state,
        ...action.superHero.map((superHero) => {
          return {
            ...superHero,
          };
        }),
      ];

    case fromSuperHero.DELETE_SUPER_HERO:
      return state.filter((superHero) => superHero.id !== action.id);

    default:
      return state;
  }
}
