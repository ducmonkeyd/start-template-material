import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriesRoutingModule } from './categories-routing';
import { CategoriesComponent } from './categories.component';

// import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // SharedModule,
    RouterModule,
    CategoriesRoutingModule,
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule {}
