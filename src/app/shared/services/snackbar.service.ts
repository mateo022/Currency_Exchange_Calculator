import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SNACKBAR_PANEL_TYPES } from '../models/material/snackbar-custom-classes.model';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private defaultDuration = 4;
  private readonly deafultHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private readonly deafultVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private readonly snackbarCustomClassesDictionary: {[key: string]: string} = {
    default: "snack-bar-panel",
    error: "snack-bar-error-panel"
  };
  constructor(private _snackBar: MatSnackBar) { }

  /**
   * Open a new snackbar with the specified message.
   * @param {string} message : message for be shown
   */
  openSnackBar(message: string, snackbarCustomClass: string = SNACKBAR_PANEL_TYPES.DEFAULT) {

    this._snackBar.open(message, 'x', {
      horizontalPosition: this.deafultHorizontalPosition,
      verticalPosition: this.deafultVerticalPosition,
      panelClass: [this.snackbarCustomClassesDictionary[snackbarCustomClass]],
      duration: this.defaultDuration * 1000
    });
  }
}