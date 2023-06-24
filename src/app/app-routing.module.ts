import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './modules/auth/403/access-denied.component';
import { NoContentComponent } from './modules/auth/404/not-found.component';

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./modules/auth/login/login.module').then(module => module.LoginModule) 
  },
  { 
    path: '', 
    loadChildren: () => import('./modules/wrapper-layout/wrapper-layout.module').then(module  => module.WrapperLayoutModule)
  },

  
  /* No Content */
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: NoContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
