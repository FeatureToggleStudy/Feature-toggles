import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureToggleService } from './service/feature-toggle.service';
import { FeatureToggles } from './models/feature-toggle.model';

export const FEATURE_TOGGLE_SERVICE = 'featureToggleService';
export const FEATURE_TOGGLE_CONFIG = 'featureToggleConfig';

interface Constructable<T, P> {
  new (args: P): T;
}

interface ForRootPayload<T extends string> {
  config?: FeatureToggles<T>;
  customService?: Constructable<FeatureToggleService<T>, FeatureToggles<T>>;
}

@NgModule({
  imports: [CommonModule]
})
export class FeatureTogglesModule {
  constructor(public i: Injector) {
    FeatureTogglesModule.injector = i;
  }
  static injector: Injector;

  static forRoot<T extends string>(payload: ForRootPayload<T>): ModuleWithProviders {
    const { config, customService } = payload;

    return {
      ngModule: FeatureTogglesModule,
      providers: [
        {
          provide: FEATURE_TOGGLE_SERVICE,
          useFactory: () => {
            let service: FeatureToggleService<T>;
            if (customService) {
              service = new customService(config);
              if (!(service instanceof FeatureToggleService)) {
                console.warn(
                  `Feature Toggles: ${(service as () => any).constructor.name} is not instance of FeatureToggleService.
                  You need to extend custom service with FeatureToggleService to have properly working feature toggles.`
                );
              }
            } else {
              service = new FeatureToggleService<T>(config);
            }
            return service;
          }
        }
      ]
    };
  }
}
