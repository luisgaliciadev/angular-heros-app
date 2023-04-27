import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import {
  Company,
  SuperHero,
} from '../../../shared/interfaces/super-hero.interface';
import { SuperHerosService } from 'src/app/services/super-heros.service';

import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddComponent } from './add.component';

class FakeRouter {
  navigate() {}

  get url() {
    return 'editar';
  }
}

describe('AddComponent', () => {
  let component: AddComponent;
  let service: any;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', {
      post: of({}),
      get: of({}),
    });
    service = new SuperHerosService(spy);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        MaterialModule,
        ComponentsModule,
        PipesModule,
        SharedModule,
        DirectivesModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Router, useClass: FakeRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '14' } },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente AddComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debería de crear un formulario con 4 elementos, name, compny, info e img', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('company')).toBeTruthy();
    expect(component.form.contains('info')).toBeTruthy();
    expect(component.form.contains('img')).toBeTruthy();
  });

  describe('Debería el formulario ser válido', () => {
    it('Debería ingresar el campo name es obligatorio', () => {
      const control = component.form.get('name')!;
      control.setValue('Spiderman');

      expect(control.value.length).toBeGreaterThanOrEqual(1);
    });

    it('Debería ingresar el campo company es obligatorio', () => {
      const control = component.form.get('company')!;
      control.setValue('Marvel');

      expect(control.value.length).toBeGreaterThanOrEqual(1);
    });

    it('Debería ingresar el campo info es obligatorio', () => {
      const control = component.form.get('info')!;
      control.setValue('El hombre araña');

      expect(control.value.length).toBeGreaterThanOrEqual(1);
    });

    it('Debería ingresar el campo img es obligatorio', () => {
      const control = component.form.get('img')!;
      control.setValue('imagen');

      expect(control.value.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('Debería el formulario ser inválido', () => {
    const superHero: SuperHero = {
      name: '',
      company: Company.Marvel,
      info: 'El hombre araña',
      img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    const name = component.form.get('name')!;
    name.setValue(superHero.name);
    const company = component.form.get('company')!;
    company.setValue(superHero.company);
    const info = component.form.get('info')!;
    info.setValue(superHero.info);
    const img = component.form.get('img')!;
    img.setValue(superHero.img);

    component.guardar();

    expect(component.form.invalid).toBeTrue();
  });

  it('Debería de agregar un nuevo Super Héroe', () => {
    const superHero: SuperHero = {
      name: 'Spiderman',
      company: Company.Marvel,
      info: 'El hombre araña',
      img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    router.navigate(['super-heros/add']);

    expect(spy).toHaveBeenCalledWith(['super-heros/add']);

    spyOn(service, 'addSuperHero').and.returnValue(Observable.from([]));

    const name = component.form.get('name')!;
    name.setValue(superHero.name);
    const company = component.form.get('company')!;
    company.setValue(superHero.company);
    const info = component.form.get('info')!;
    info.setValue(superHero.info);
    const img = component.form.get('img')!;
    img.setValue(superHero.img);

    component.guardar();

    expect(component.superHero).toEqual(superHero);
  });

  it('Debería de editar el Super Héroe con id 15', () => {
    const superHero: SuperHero = {
      id: '15',
      name: 'Spiderman2',
      company: Company.Marvel,
      info: 'El hombre araña',
      img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    router.navigate(['super-heroes/editar', superHero.id]);

    expect(spy).toHaveBeenCalledWith(['super-heroes/editar', superHero.id]);

    spyOn(service, 'editSuperHero').and.returnValue(
      Observable.from([superHero])
    );

    component.superHero.id = superHero.id;
    const name = component.form.get('name')!;
    name.setValue(superHero.name);
    const company = component.form.get('company')!;
    company.setValue(superHero.company);
    const info = component.form.get('info')!;
    info.setValue(superHero.info);
    const img = component.form.get('img')!;
    img.setValue(superHero.img);

    component.guardar();

    expect(component.superHero).toEqual(superHero);
  });
});
