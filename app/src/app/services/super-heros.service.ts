import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SuperHero } from '../shared/interfaces/super-hero.interface';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SuperHerosService {
  page = 0;

  constructor(private http: HttpClient) {}

  getSuperHeros(
    search: string,
    buscando: boolean = false
  ): Observable<SuperHero[]> {
    if (buscando) {
      this.page = 0;
    }
    this.page++;
    return this.http.get<SuperHero[]>(
      `${apiUrl}/super-heroes?name_like=${search}&_page=${this.page}&_limit=8&_sort=id&_order=desc`
    );
  }

  getSuperHeroById(id: string): Observable<SuperHero> {
    return this.http.get<SuperHero>(`${apiUrl}/super-heroes/${id}`);
  }

  addSuperHero(superHero: SuperHero): Observable<SuperHero> {
    return this.http.post<SuperHero>(`${apiUrl}/super-heroes`, superHero);
  }

  editSuperHero(superHero: SuperHero): Observable<SuperHero> {
    return this.http.put<SuperHero>(
      `${apiUrl}/super-heroes/${superHero.id}`,
      superHero
    );
  }

  deleteSuperHero(id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/super-heroes/${id}`);
  }
}
