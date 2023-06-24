import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { WrapperLayoutComponent } from './wrapper-layout.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutRoutingModule } from './wrapper-layout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbCollapseModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    LayoutRoutingModule
  ],
  declarations: [HeaderComponent, SideBarComponent, FooterComponent, WrapperLayoutComponent]
})
export class WrapperLayoutModule {}
