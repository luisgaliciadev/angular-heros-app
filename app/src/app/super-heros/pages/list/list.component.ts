import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SuperHerosService } from '../../../services/super-heros.service';
import { SuperHero } from '../../../shared/interfaces/super-hero.interface';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducers';
import * as fromSuperHero from '../../super-heros.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild('inputSearch', { static: false })
  inputSearch: ElementRef;

  pages: boolean = false;
  superHeros: SuperHero[] = [];
  search: string = '';

  constructor(
    private superHerosService: SuperHerosService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.superHeros = state.superHeros;
    });

    this.newQuery('');
  }

  ngAfterViewInit() {
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((search: string) => {
        this.newQuery(search);
      });
  }

  newQuery(search: string) {
    const action = new fromSuperHero.initSuperHeroAction([]);
    this.store.dispatch(action);

    this.search = search;
    this.getSuperHeros(true);
  }

  getSuperHeros(buscando: boolean) {
    this.superHerosService
      .getSuperHeros(this.search.trim(), buscando)
      .subscribe((superHeros) => {
        this.pages = superHeros.length < 8 ? false : true;

        const action = new fromSuperHero.addSuperHeroAction(superHeros);
        this.store.dispatch(action);
      });
  }
}
