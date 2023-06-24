import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/shared/services/login.service';
import { UserContextModel, TokenModel, TokenDetailModel, UserInfoModel } from '@app/shared/models/user/user.model';
import { JwtTokenHelper } from '@app/shared/common/jwt-token-helper/jwt-token-helper';
import { StorageKey } from '@app/shared/models/storage-key/storage-key';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientState } from '@app/shared/services/client/client-state';
import { I18nService } from '@app/core/i18n.service';
import { Configs } from '@app/shared/common/configs/configs';
import { DropdownModel } from '@app/shared/models/dropdown/dropdown.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public userContextModel: UserContextModel = new UserContextModel();
  public loginForm: FormGroup;
  public isLoading = false;
  public errorMessage: string;
  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    public clientState: ClientState,
    public i18nService: I18nService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = new FormBuilder().group({
      email: ['admin', [Validators.required]],
      password: ['123456', [Validators.required]]
    });
    
    // logout will need this to keep the lang
    if (!localStorage.getItem(Configs.languageCodeKey)) {
      let selectedLang = this.languages.find(x => x.selected == true);
      this.setLanguage(selectedLang);
    }
  }

  login(value: {email: string, password: string}) {
    this.clientState.isBusy = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.userContextModel.username = value.email;
      this.userContextModel.password = value.password;

      this.loginService.onLogin(this.userContextModel).subscribe(
        res => {
          this.clientState.isBusy = false;
          this.isLoading = false;
          this.errorMessage = '';
          let tokenModel = <TokenModel>{ ...res };
          if (tokenModel && tokenModel.access_token) {
            let tokenInfo = <TokenDetailModel>JwtTokenHelper.DecodeToken(tokenModel.access_token).data;
            let userInfo = <UserInfoModel>{
              email: tokenInfo.email,
              fullName: tokenInfo.fullName,
              roleName: tokenInfo.roleName,
              role: tokenInfo.role,
              roles: [+tokenInfo.role]
            };
            localStorage.setItem(StorageKey.Token, tokenModel.access_token);
            localStorage.setItem(StorageKey.User, JwtTokenHelper.CreateSigningToken(userInfo));
            this.router.navigate([this.returnUrl]);
          }
        },
        err => {
          this.clientState.isBusy = false;
          this.errorMessage = err.error.error_description;
          this.isLoading = false;
        },
      );
    }
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
