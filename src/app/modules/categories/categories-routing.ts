import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'list' 
  },
  { 
    path: 'list', 
    data: { title: 'Nav.Categories.Title' },
    component: CategoriesComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CategoriesRoutingModule {}
