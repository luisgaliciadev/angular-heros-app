import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SuperHerosService } from './super-heros.service';
import { Company, SuperHero } from '../shared/interfaces/super-hero.interface';

import { environment } from '../../environments/environment.prod';

const apiUrl = environment.apiUrl;

describe('SuperHerosService', () => {
  let httpTestingController: HttpTestingController;
  let superHerosService: SuperHerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperHerosService],
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([SuperHerosService], (service: SuperHerosService) => {
    superHerosService = service;
  }));

  it('Debería crear el servicio SuperHerosService', () => {
    expect(superHerosService).toBeTruthy();
  });

  it('Debería de listar los Super Héroes', () => {
    const superHeros: SuperHero[] = [
      {
        name: 'Spiderman',
        company: Company.Marvel,
        info: 'El hombre araña',
        img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
      },
    ];

    let result: any;
    superHerosService
      .getSuperHeros('')
      .subscribe((t: SuperHero[]) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${apiUrl}/super-heroes?name_like=&_page=1&_limit=8&_sort=id&_order=desc`,
    });

    req.flush([superHeros]);

    expect(result[0][0]).toEqual(superHeros[0]);
  });

  it('Debería de listar un Super Héroes', () => {
    const superHero: SuperHero = {
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    let result: any;
    superHerosService
      .getSuperHeroById(superHero.id!)
      .subscribe((t: SuperHero) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${apiUrl}/super-heroes/${superHero.id}`,
    });

    req.flush([superHero]);

    expect(result[0]).toEqual(superHero);
  });

  it('Debería de agregar un nuevo Super Héroe', () => {
    const superHero: SuperHero = {
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    let result: any;
    superHerosService
      .addSuperHero(superHero)
      .subscribe((t: SuperHero) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${apiUrl}/super-heroes`,
    });

    req.flush([superHero]);

    expect(result[0]).toEqual(superHero);
  });

  it('Debería de editar un Super Héroe', () => {
    const superHero: SuperHero = {
      id: '1',
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    let result: any;
    superHerosService
      .editSuperHero(superHero)
      .subscribe((t: SuperHero) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${apiUrl}/super-heroes/${superHero.id}`,
    });

    req.flush([superHero]);

    expect(result[0]).toEqual(superHero);
  });

  it('Debería de borrar un Super Héroe', () => {
    const superHero: SuperHero = {
      id: '1',
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    let result: any;
    superHerosService
      .deleteSuperHero(superHero.id!)
      .subscribe((t: SuperHero) => (result = t));

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${apiUrl}/super-heroes/${superHero.id}`,
    });

    req.flush([superHero]);

    expect(result[0]).toEqual(superHero);
  });
});
