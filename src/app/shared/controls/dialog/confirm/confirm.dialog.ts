import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ClientState } from '../../../services/client/client-state';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm.dialog.html'
})
export class ConfirmDialogComponent implements OnInit {

  @Input() visible: boolean = true;
  @Input() header: string;
  @Input() content: string;
  @Input() confirmText: string;
  @Output() confirm: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private clientState: ClientState,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  ngOnInit(): void {
  }

  onConfirm = () => {
    this.confirm.emit(true);
    this.dialogRef.close(true);
  };

  onClose = () => {
    this.confirm.emit(false);
    this.dialogRef.close(false);
  };
}
