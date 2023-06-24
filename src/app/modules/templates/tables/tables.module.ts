import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    TablesRoutingModule
  ],
  declarations: [TablesComponent]
})
export class TablesModule {}
