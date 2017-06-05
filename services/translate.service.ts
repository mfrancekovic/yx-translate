import {Inject, Injectable} from '@angular/core';
import {Http} from "@angular/http";

export class TranslateConfig {
  folder: string;
  language: string;
}

@Injectable()
export class TranslateService {

  private language: string;
  private folder: string;
  private translations: any;

  constructor(
    @Inject("translate.config") private translateConfig: TranslateConfig,
    private http: Http
  ) {
    this.language = translateConfig.language;
    this.folder = translateConfig.folder;
    this.reloadTranslations();
  }

  reloadTranslations() {
    const savedLang = localStorage.getItem('yx_language');
    if (savedLang) {
      this.language = savedLang;
    }

    this.http.get(this.folder + '/' + this.language + '.json').subscribe(res => {
      this.translations = res.json();
    });
  }

  translate(value: string) {
    if (!this.translations) {
      return value;
    }
    let translation = this.translations[value];
    if (translation) {
      return translation;
    } else {
      return value;
    }
  }

  changeLanguage(value: string) {
    if (value !== this.language) {
      localStorage.setItem('yx_language', value);
      location.reload();
    }
  }

}
