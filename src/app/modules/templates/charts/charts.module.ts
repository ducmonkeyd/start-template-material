import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    ChartsRoutingModule
  ],
  declarations: [ ChartsComponent]
})
export class ChartsModule {}
