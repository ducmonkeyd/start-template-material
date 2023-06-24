import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import enUS from '../../translations/en-US.json';
import viVN from '../../translations/vi-VN.json';
import { ApiError, ApiDescriptionError } from '@app/shared/models/api-response/api-response';
import { Configs } from '@app/shared/common/configs/configs';
const languageKey = 'language';

@Injectable()
export class I18nService {
  defaultLanguage!: string;
  supportedLanguages!: string[];

  private langChangeSubscription!: Subscription;

  constructor(private translateService: TranslateService) {
    // Embed languages to avoid extra HTTP requests
    translateService.setTranslation('English', enUS);
    translateService.setTranslation('Vietnamese', viVN);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.translateService.setDefaultLang(this.defaultLanguage)
    // Warning: this subscription will always be alive for the app's lifetime
    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem(languageKey, event.lang);
      this.onSetLangCode(event.lang);
    });
  }

  onSetLangCode(language: string) {
    let languageCode: string;
    switch (language) {
      case 'English':
        languageCode = LanguageCodeEnum.English.valueOf();
        break;

      case 'Vietnamese':
        languageCode = LanguageCodeEnum.Vietnamese.valueOf();
        break;

      default:
        languageCode = '';
    }
    localStorage.setItem(Configs.languageCodeKey, languageCode);
  }

  /**
   * Cleans up language change subscription.
   */
  destroy() {
    this.langChangeSubscription.unsubscribe();
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    language = language || localStorage.getItem(languageKey) || this.translateService.getBrowserCultureLang();
    let isSupportedLanguage = this.supportedLanguages.includes(language);

    // If no exact match is found, search without the region
    if (language && !isSupportedLanguage) {
      language = language.split('-')[0];
      language = this.supportedLanguages.find(supportedLanguage => supportedLanguage.startsWith(language)) || '';
      isSupportedLanguage = Boolean(language);
    }

    // Fallback if language is not supported
    if (!isSupportedLanguage) {
      language = this.defaultLanguage;
    }

    this.translateService.use(language);

    //write deafault lang to localstorage if there is none :
    if (!localStorage.getItem(languageKey)) {
      localStorage.setItem(languageKey, language);
      this.onSetLangCode(language);
    }
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this.translateService.currentLang;
  }

  getTransError = (error: ApiError) => {
    let key = 'Commons.HttpError.' + (error && error.error ? error.error : '');
    let translated = this.translateService.instant(key);
    if (translated == key) {
      return error && error.errorMessage
        ? error.errorMessage
        : this.translateService.instant('Commons.HttpError.Default');
    } else {
      return translated;
    }
  };

  getTransErrorDescription = (error: ApiDescriptionError) => {
    let key = 'Commons.HttpError.' + (error && error.error ? error.error : '');
    let translated = this.translateService.instant(key);
    if (translated == key) {
      return error && error.error_description
        ? error.error_description
        : this.translateService.instant('Commons.HttpError.Default');
    } else {
      return translated;
    }
  };

  getTransByKey = (key: string) => {
    let translated = this.translateService.instant(key);
    if (translated == key) {
      return this.translateService.instant('Commons.Texts.Unknown');
    } else {
      return translated;
    }
  };

  getTransEnum = (enumName: string) => {
    let key = 'Commons.Enums.' + enumName;
    let translated = this.translateService.instant(key);
    if (translated == key) {
      return this.translateService.instant('Commons.Texts.Unknown');
    } else {
      return translated;
    }
  };

  getCurrentLanguageCode = (): string => {
    return this.language.split('-')[0].toLocaleLowerCase();
  };
}

enum LanguageCodeEnum {
  Vietnamese = 'vi-VN',
  English = 'en-US'
}
