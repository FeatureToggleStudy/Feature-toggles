import { Component } from '@angular/core';
import { FeatureToggleFlags } from './feature-toggle/decorators/feature-toggle-flags.decorator';
import { FeatureToggles } from './feature-toggle/models/feature-toggle.model';
import { FeatureTogglesEnum } from './app.module';
import { replacePropertyWith } from './feature-toggle/decorators/replace-property-with.decorator';
import { replaceMethodWith } from './feature-toggle/decorators/replace-method-with.decorator';
import { replaceMethodWithFunction } from './feature-toggle/decorators/replace-method-with-function.decorator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// @FeatureToggleFlags()
export class AppComponent {
  // readonly __featureToggles: FeatureToggles<FeatureTogglesEnum>;
  bgColor: string;

  // @replacePropertyWith(FeatureTogglesEnum.CHANGE_TITLE, 'newTitle')
  title = 'Feature Toggles';

  // newTitle = 'Title changed';

  // @replaceMethodWithFunction(FeatureTogglesEnum.RANDOM_BACKGROUND, function(...args: any[]) {
  //   return this.setRandomBgColor(...args);
  // })
  setBgColor(a) {
    this.bgColor = 'blue';
  }

  // setRandomBgColor() {
  //   this.bgColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  // }
}
