import { Router, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { DialogService } from '@app/shared/services/client/dialog.service';
import { DialogData } from '@app/shared/models/material/material.model';


@Injectable({
  providedIn: 'root'
})
export class leavePage implements CanDeactivate<any> {
    constructor(
      private router: Router,
      private dialogService: DialogService
    ) {}
    canDeactivate(): boolean {
      if(this.dialogService.state.value) {
        return true;
      } else {
        this.dialogService.onOpenConfirmDialog(<DialogData> {
            title: 'Cảnh báo',
            content: 'Bạn có muốn rời khỏi trang này',
            confirmText: 'YES'
        })
        return false;
      }
    }
  }
  