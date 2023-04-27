import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 3000,
    });
  }
}
