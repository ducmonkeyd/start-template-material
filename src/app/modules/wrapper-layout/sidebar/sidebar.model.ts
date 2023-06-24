import { UserRole } from '@app/shared/models/user/user.model';
import { AppNavItem } from '@app/shared/models/app-nav/app-nav.model';

export const navItems: AppNavItem[]  = [
  {
    id: 'Categories',
    translateKey: 'Nav.Categories.Title',
    title: 'Categories',
    icon: 'fa fa-cubes',
    subIcon: '',
    type: 'nav-parent',
    url: 'categories',
    isActive: false,
    children: []
  },
  {
    id: 'Employees',
    translateKey: 'Nav.Employees.Title',
    title: 'Employees',
    icon: 'fa fa-users',
    subIcon: '',
    type: 'nav-parent',
    url: 'employees',
    isActive: false,
    children: []
  },
  {
    id: 'Templates',
    translateKey: 'Nav.Templates.Title',
    title: 'Templates',
    icon: 'fa fa-map',
    subIcon: '',
    type: 'nav-parent',
    url: '',
    isActive: false,
    children: [
      {
        id: 'cards',
        translateKey: 'Nav.Templates.Children.Cards',
        title: 'cards',
        icon: '',
        subIcon: '',
        type: 'nav-children',
        url: 'cards',
        isActive: false,
        children: []
      },
      {
        id: 'charts',
        translateKey: 'Nav.Templates.Children.Charts',
        title: 'charts',
        icon: '',
        subIcon: '',
        type: 'nav-children',
        url: 'charts',
        isActive: false,
        children: []
      },
      {
        id: 'tables',
        translateKey: 'Nav.Templates.Children.Tables',
        title: 'tables',
        icon: '',
        subIcon: '',
        type: 'nav-children',
        url: 'tables',
        isActive: false,
        children: []
      },
      {
        id: 'widgets',
        translateKey: 'Nav.Templates.Children.Widgets',
        title: 'widgets',
        icon: '',
        subIcon: '',
        type: 'nav-children',
        url: 'widgets',
        isActive: false,
        children: []
      },
    ]
  }
];
