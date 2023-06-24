import { NgModule } from "@angular/core";
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "@app/shared/shared.module";

import { AccessDeniedComponent } from './access-denied.component';


@NgModule({
    imports: [SharedModule, TranslateModule],
    declarations: [
        AccessDeniedComponent
    ],
    exports: [AccessDeniedComponent]
})
export class AccessDeniedModule { }