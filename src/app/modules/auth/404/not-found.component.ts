import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'page-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NoContentComponent {

  constructor(
    private _location: Location
  ) { }
  
  onBack() {
    this._location.back();
  }
}
