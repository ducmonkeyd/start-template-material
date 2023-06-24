import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'page-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent {

  constructor(
    private _location: Location
  ) { }
  
  onBack() {
    this._location.back();
  }
}
