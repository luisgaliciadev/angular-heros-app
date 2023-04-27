import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { UiService } from '../../../app/services/ui.service';
import { SuperHero } from '../../shared/interfaces/super-hero.interface';
import * as fromSuperHero from '../../super-heros/super-heros.actions';
import { AppState } from '../../..//app/app.reducers';
import { SuperHerosService } from '../../services/super-heros.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-super-hero-card',
  templateUrl: './super-hero-card.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class SuperHeroCardComponent {
  @Input() superHero!: SuperHero;

  constructor(
    private superHerosService: SuperHerosService,
    private uiService: UiService,
    public matDialog: MatDialog,
    private store: Store<AppState>
  ) {}

  borrar() {
    const dialogRef = this.matDialog.open(ModalConfirmComponent, {
      width: '300px',
      data: this.superHero,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.superHerosService
          .deleteSuperHero(this.superHero.id!)
          .subscribe(() => {
            const action = new fromSuperHero.deleteSuperHeroAction(
              this.superHero.id!
            );

            this.store.dispatch(action);
            this.uiService.showSnackBar('Super Héroe borrado exitosamente');
          });
      }
    });
  }
}
