import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dataModel } from '@app/shared/models/data-model/data-model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  sub: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  data = dataModel;
  constructor() { }
  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  groupYear() {
    for(let i = 0; i < this.data.length; i++) {
      let count =  1;
      for(let j = i +1 ;j < this.data.length; j++) {
        if(this.data[i].year == this.data[j].year) {
          let temp = {...this.data[j]};
          let temp1 = {...this.data[i + count]};
          this.data[i + count] = temp;
          this.data[j] = temp1;
          count++;
        }
      }
    }
  }

}
