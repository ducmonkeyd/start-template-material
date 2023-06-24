import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@app/core/authentication/authenticaiton.guard';
import { WrapperLayoutComponent } from './wrapper-layout.component';
import { RoleGuard } from '@app/core/authentication/role.guard';
import { UserRole } from '@app/shared/models/user/user.model';
import { leavePage } from '@app/core/authentication/leavePage.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
  },
  {
    path: '',
    component: WrapperLayoutComponent,
    children: [
      {
        path: 'categories',
        canActivate: [RoleGuard],
        data: {
          reuse: true,
          expectedRoles: [UserRole.Admin, UserRole.Customer]
        },
        loadChildren: () => import('../categories/categories.module').then(component => component.CategoriesModule)
      },
      {
        path: 'employees',
        canActivate: [RoleGuard],
        data: {
          reuse: true,
          expectedRoles: [UserRole.Admin]
        },
        loadChildren: () => import('../employees/employees.module').then(component => component.EmployeesModule)
      },
      {
        path: 'cards',
        canActivate: [RoleGuard],
        data: {
          reuse: true,
          expectedRoles: [UserRole.Admin]
        },
        loadChildren: () => import('../templates/cards/cards.module').then(component => component.CardsModule)
      },
      {
        path: 'tables',
        canActivate: [RoleGuard],
        data: {
          reuse: true,
          expectedRoles: [UserRole.Admin]
        },
        loadChildren: () => import('../templates/tables/tables.module').then(component => component.TablesModule)
      },
      {
        path: 'widgets',
        canActivate: [RoleGuard],
        data: {
          reuse: true,
          expectedRoles: [UserRole.Admin]
        },
        loadChildren: () => import('../templates/widgets/widgets.module').then(component => component.WidgetsModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LayoutRoutingModule { }
