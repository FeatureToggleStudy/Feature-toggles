import { FeatureTogglesModule, FEATURE_TOGGLE_SERVICE } from '../feature-toggle.module';
import { Subscription } from 'rxjs';

export const replacePropertyWith = (toggle: string, propertyName: any): PropertyDecorator => {
  let sub: Subscription;

  return (target: any, key: string) => {
    const originalNgOnInit = target.constructor.prototype.ngOnInit;
    const originalNgOnDestroy = target.constructor.prototype.ngOnDestroy;

    target.constructor.prototype.ngOnInit = function(...args) {
      const service = FeatureTogglesModule.injector.get(FEATURE_TOGGLE_SERVICE);

      sub =
        service.config$ &&
        service.config$.subscribe(config => {
          if (config && config[toggle]) {
            this[`__${key}`] = this[key];
            delete this[key];

            Object.defineProperty(this, key, {
              configurable: true,
              enumerable: true,
              get: () => {
                return this[propertyName];
              },
              set: (newValue: any) => {
                this[propertyName] = newValue;
              }
            });
          } else {
            if (this[`__${key}`]) {
              delete this[key];
              this[key] = this[`__${key}`];
              delete this[`__${key}`];
            }
          }
        });

      const result = originalNgOnInit && originalNgOnInit.apply(this, args);

      return result;
    };

    target.constructor.prototype.ngOnDestroy = function(...args) {
      sub.unsubscribe();

      const result = originalNgOnInit && originalNgOnDestroy.apply(this, args);

      return result;
    };
  };
};
