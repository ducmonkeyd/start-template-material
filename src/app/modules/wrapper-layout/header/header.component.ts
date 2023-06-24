import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { I18nService } from '@app/core/i18n.service';
import { DropdownModel } from '@app/shared/models/dropdown/dropdown.model';
import { navItems } from '../sidebar/sidebar.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() isOverMode: boolean;

  public menuModel = { items: navItems }
  public title: string;
  private locationPath: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private i18nService: I18nService
  ) {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): DropdownModel[] {
    return this.i18nService.supportedLanguages.map(l => {
      return <DropdownModel>{ value: l, text: l.toString(), selected: l == this.currentLanguage };
    });
  }

  setLanguage(languageDropdown: DropdownModel) {
    this.i18nService.language = languageDropdown.value.toString();
  }
}
