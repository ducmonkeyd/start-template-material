import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MessageType, SnackbarData } from '@app/shared/models/material/material.model';

/**
 * @title Snack-bar with a custom component
 */
@Component({
  selector: 'snack-bar',
  templateUrl: 'snack-bar.component.html',
  styleUrls: ['snack-bar.component.scss']
})
export class SnackBarComponent {
  public messageType: typeof MessageType = MessageType;

  constructor(
    private snackbarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) {}

  ngOnInit() {}

  onDismissSnackBar() {
    this.snackbarRef.dismiss();
  }

  onDismissSnackBarWithAction() {
    this.snackbarRef.dismissWithAction();
  }
}
