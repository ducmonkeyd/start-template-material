import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "@app/shared/shared.module";

import { NoContentComponent } from './not-found.component';

@NgModule({
    imports: [SharedModule, TranslateModule],
    declarations: [
        NoContentComponent
    ],
    exports: [NoContentComponent]
})
export class NotFoundModule { }