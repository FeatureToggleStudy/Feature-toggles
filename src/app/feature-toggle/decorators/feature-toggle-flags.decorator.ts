import { FeatureTogglesModule, FEATURE_TOGGLE_SERVICE } from '../feature-toggle.module';
import { Subscription } from 'rxjs';

export function FeatureToggleFlags(): ClassDecorator {
  let sub: Subscription;
  return target => {
    if (!Object.keys(target.prototype).includes('ngOnInit')) {
      target.prototype.ngOnInit = () => {};
    }
    if (!Object.keys(target.prototype).includes('ngOnDestroy')) {
      target.prototype.ngOnInit = () => {};
    }
    Object.keys(target.prototype).forEach(methodName => {
      const originalMethod = target.prototype[methodName];

      if (typeof originalMethod !== 'function') {
        return;
      }

      target.prototype[methodName] = function(...args) {
        if (methodName === 'ngOnInit') {
          const service = FeatureTogglesModule.injector.get(FEATURE_TOGGLE_SERVICE);

          this.__featureToggles = service.config;
          this.__featureToggles$ = service.config$;

          sub = service.config$ && service.config$.subscribe(val => (this.__featureToggles = val));
        }

        if (methodName === 'ngOnDestroy' && sub) {
          sub.unsubscribe();
        }

        const result = originalMethod.apply(this, args);

        return result;
      };
    });
  };
}
