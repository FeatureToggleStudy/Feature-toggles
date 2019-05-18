import { Component } from '@angular/core';
import { FeatureToggleFlags } from './feature-toggle/decorators/feature-toggle-flags.decorator';
import { FeatureToggles } from './feature-toggle/models/feature-toggle.model';
import { FeatureTogglesEnum } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@FeatureToggleFlags()
export class AppComponent {
  readonly __featureToggles: FeatureToggles<FeatureTogglesEnum>;

  title = 'FeatureToggle';
}
