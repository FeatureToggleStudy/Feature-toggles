import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeatureTogglesModule } from './feature-toggle/feature-toggle.module';
import { MyModuleModule } from './my-module/my-module.module';
import { FeatureToggles } from './feature-toggle/models/feature-toggle.model';
import { CustomFeatureTogglesService } from './custom-feature-toggles.service';

export const enum FeatureTogglesEnum {
  CHANGE_TITLE = 'change_title',
  SHOW_LOGO = 'show_logo',
  RANDOM_BACKGROUND = 'random_background'
}

const config: FeatureToggles<FeatureTogglesEnum> = {
  [FeatureTogglesEnum.CHANGE_TITLE]: true,
  [FeatureTogglesEnum.SHOW_LOGO]: true,
  [FeatureTogglesEnum.RANDOM_BACKGROUND]: false
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MyModuleModule,
    FeatureTogglesModule.forRoot<FeatureTogglesEnum>({
      config,
      customService: CustomFeatureTogglesService
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
