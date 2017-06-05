import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import {TranslateConfig, TranslateService} from "./services/translate.service";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TranslatePipe
  ],
  declarations: [TranslatePipe]
})
export class TranslationModule {

  static forRoot(language?: string, folder?: string): ModuleWithProviders {

    let translateConfig = new TranslateConfig();
    translateConfig.folder = 'assets/yx-i18n';
    translateConfig.language = 'en';

    if (language) {
      translateConfig.language = language;
    }
    if (location) {
      translateConfig.folder = folder;
    }

    return {
      ngModule: TranslationModule,
      providers: [
        TranslateService,
        {provide: "translate.config", useValue: translateConfig}
      ]
    };
  }

}
