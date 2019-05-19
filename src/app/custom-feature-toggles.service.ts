import { Injectable } from '@angular/core';
import { FeatureToggleService } from './feature-toggle/service/feature-toggle.service';
import { FeatureTogglesEnum } from './app.module';
import { FeatureToggles } from './feature-toggle/models/feature-toggle.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomFeatureTogglesService extends FeatureToggleService<FeatureTogglesEnum> {
  constructor(config?: FeatureToggles<FeatureTogglesEnum>) {
    super(undefined);

    setTimeout(() => {
      this.config$ = of(config);
    }, 2000);
  }
}
