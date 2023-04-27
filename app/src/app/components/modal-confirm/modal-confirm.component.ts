import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SuperHero } from '../../shared/interfaces/super-hero.interface';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styles: [],
})
export class ModalConfirmComponent {
  constructor(
    private matDialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuperHero
  ) {}

  confirm() {
    this.matDialogRef.close(true);
  }

  cancel() {
    this.matDialogRef.close();
  }
}
