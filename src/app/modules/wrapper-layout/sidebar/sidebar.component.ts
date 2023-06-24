import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { navItems } from './sidebar.model';
import { UserInfoModel } from '@app/shared/models/user/user.model';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { JwtTokenHelper } from '@app/shared/common/jwt-token-helper/jwt-token-helper';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AppNavModel, AppNavItem } from '@app/shared/models/app-nav/app-nav.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '1'
      })),
      transition('initial=>final', animate('200ms')),
      transition('final=>initial', animate('200ms'))
    ]),
  ]
})
export class SideBarComponent implements OnInit {

  @Input() isOverMode: boolean;
  @Output() onToggleAppNav: EventEmitter<boolean> = new EventEmitter();
  @Output() overMode: EventEmitter<boolean> = new EventEmitter();

  public isToggleNav = true;
  public collapsed: number | null;
  public navModels: AppNavModel = { items: navItems };
  private locationPath: string;
  private isAuthen: boolean;
  private userInfo: UserInfoModel;
  private mainActive: any;
  constructor(
    private router: Router,
    // private i18nService: I18nService, translate
    private authService: AuthenticationService
    ) {
    this.isAuthen = this.authService.isAuthenticated();

    if (this.isAuthen) {
      this.userInfo = JwtTokenHelper.GetUserLoggedInInfo();
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.locationPath = event.urlAfterRedirects.slice(1);
        let navigationPaths = this.locationPath.split('/');
        this.navModels.items.map(main => {
          main.children.map(parent => {
            parent.isActive = false;
            if (navigationPaths[0] === parent.url) {
              parent.isActive = true;
              main.isActive = true;
              this.mainActive = main;
              this.navModels.items.forEach(element => {
                if(element.id != this.mainActive.id) {
                  element.isActive = false;
                }
              });
            }
            if (parent.children.some(child => navigationPaths[0] === child.url)) {
              parent.isActive = true;
              main.isActive = true;
              this.mainActive = main;
              this.navModels.items.forEach(element => {
                if(element.id != this.mainActive.id) {
                  element.isActive = false;
                }
              });
            }
          });
          if(main.children.length == 0) {
            if(navigationPaths[0] == main.url) {
              main.isActive = true;
              this.mainActive = main;
              this.navModels.items.forEach(element => {
                if(element.id != this.mainActive.id) {
                  element.isActive = false;
                }
              });
            } else {
              main.isActive = false;
            }
          }
        });

      }
    });
  }

  checkActivateUrl = (parentItem: AppNavItem) => {
    let navigationPaths = this.locationPath ? this.locationPath.split('/') : [];

    if (!parentItem && !navigationPaths) {
      return false;
    }

    return parentItem.url == navigationPaths[1] || parentItem.children.some(child => child.url == navigationPaths[1]);
  }

  onCollapsed(index: number) {
    if (this.collapsed === null) {
      this.collapsed = index;
    } else if (this.collapsed === index) {
      this.collapsed = null;
    } else {
      this.collapsed = index;
    }
  }

  emitOverMode(mode: boolean) {
    this.isToggleNav = !mode;
    this.isOverMode = mode;
    this.overMode.emit(mode);
  }

  // handle permision for type of user
  // onCheckPermision = (allowRows: UserRole[]) => {
  //   if (allowRows.length == 0) {
  //     return true;
  //   }
  //   return allowRows && allowRows.some(r => this.userInfo.roles.indexOf(r) != -1);
  // };

  ngOnInit(): void {
    this.navModels.items.map((item, index) => item.isActive ? this.collapsed = index : null);
  }
}
