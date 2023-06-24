import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    CardsRoutingModule
  ],
  declarations: [CardsComponent]
})
export class CardsModule {}
