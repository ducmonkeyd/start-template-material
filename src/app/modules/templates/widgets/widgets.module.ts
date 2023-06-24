import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    WidgetsRoutingModule
  ],
  declarations: [WidgetsComponent]
})
export class WidgetsModule {}
