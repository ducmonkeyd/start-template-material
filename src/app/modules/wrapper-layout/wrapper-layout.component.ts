import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './wrapper-layout.component.html',
  styleUrls: ['./wrapper-layout.component.scss']
})
export class WrapperLayoutComponent implements OnInit {

  isOverMode = false;

  constructor(
    private router: Router
  ) { }

  onOverMode(mode: boolean) {
    this.isOverMode = mode;
  }

  ngOnInit() {
  }

}
