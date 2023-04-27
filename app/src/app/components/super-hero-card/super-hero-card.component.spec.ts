import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import {
  Company,
  SuperHero,
} from '../../shared/interfaces/super-hero.interface';
import { SuperHerosService } from 'src/app/services/super-heros.service';

import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SuperHeroCardComponent } from './super-hero-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { appReducers } from 'src/app/app.reducers';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('SuperHeroCardComponent', () => {
  let component: SuperHeroCardComponent;
  let service: any;
  let fixture: ComponentFixture<SuperHeroCardComponent>;
  const matDialog = new MatDialogMock();
  let dialog: MatDialog;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpClient', {
      post: of({}),
      get: of({}),
    });
    service = new SuperHerosService(spy);

    await TestBed.configureTestingModule({
      declarations: [SuperHeroCardComponent],
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
        FlexLayoutModule,
        StoreModule.forRoot(appReducers),
      ],
      providers: [{ provide: MatDialog, useValue: matDialog }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([MatDialog], (d: MatDialog) => {
    dialog = d;
  }));

  it('Debería crear el componente SuperHeroCardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debería de borrar el Super Héroe con id 15', () => {
    let afterCloseCallback: jasmine.Spy;

    const superHero: SuperHero = {
      id: '15',
      name: 'Spiderman2',
      company: Company.Marvel,
      info: 'El hombre araña',
      img: 'https://assets.entrepreneur.com/content/3x2/2000/20190927183318-Spiderman.jpeg',
    };

    component.superHero = superHero;

    spyOn(service, 'deleteSuperHero').and.returnValue(
      Observable.from([superHero])
    );

    const dialogRef = dialog.open(ModalConfirmComponent, {
      width: '300px',
      data: superHero,
    });

    component.borrar();

    spyOn(matDialog, 'open');

    afterCloseCallback = jasmine.createSpy('afterClose callback');
    dialogRef.afterClosed().subscribe(afterCloseCallback);
  });
});
