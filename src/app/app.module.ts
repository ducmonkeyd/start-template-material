import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { StorageKey } from './shared/models/storage-key/storage-key';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from './core/core.module';
import { ConfirmDialogComponent } from './shared/controls';
import { AccessDeniedModule } from './modules/auth/403/access-denied.module';
import { NotFoundModule } from './modules/auth/404/not-found.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AccessDeniedModule,
    NotFoundModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    TranslateModule.forRoot(),
    CoreModule.forRoot(),
    JwtModule.forRoot({
      config: {
        throwNoTokenError: false,
        tokenGetter: GetToken
      }
    }),
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }

export function GetToken() {
  return localStorage.getItem(StorageKey.Token);
}
