import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedDirectives } from './share-directives';
import { SharedControls } from './share-controls';
import { GooglePlacesDirective } from './directives/google-places/google-places.directive';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
],
  declarations: [
      SharedDirectives,
      SharedControls,
      GooglePlacesDirective,
    ],
  exports: [
      SharedDirectives,
      SharedControls,
      MaterialModule,
      GooglePlacesDirective
    ]
})
export class SharedModule {}
