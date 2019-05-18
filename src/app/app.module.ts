import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeatureToggleModule as FeatureTogglesModule } from './feature-toggle/feature-toggle.module';
import { MyModuleModule } from './my-module/my-module.module';
import { FeatureToggles } from './feature-toggle/models/feature-toggle.model';
import { CustomFeatureTogglesService } from './custom-feature-toggles.service';

export const enum FeatureTogglesEnum {
  TEST = 'test',
  A = 'a',
  B = 'b',
  SHOW_LOGO = 'show_logo'
}

const config: FeatureToggles<FeatureTogglesEnum> = {
  [FeatureTogglesEnum.TEST]: true,
  [FeatureTogglesEnum.A]: true,
  [FeatureTogglesEnum.B]: false,
  [FeatureTogglesEnum.SHOW_LOGO]: true
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
