import { FeatureToggleModule, FEATURE_TOGGLE_SERVICE } from '../feature-toggle.module';
import { Subscription } from 'rxjs';

export const replaceMethodWith = (toggle: string, methodName: any): MethodDecorator => {
  return (target: any, key: string, descriptor: any) => {
    let service: any;

    const originalNgOnInit = target.constructor.prototype.ngOnInit;
    const original = descriptor.value;

    target.ngOnInit = function(...args) {
      service = FeatureToggleModule.injector.get(FEATURE_TOGGLE_SERVICE);
      const result = originalNgOnInit && originalNgOnInit.apply(this, args);

      return result;
    };

    descriptor.value = function(...args: any[]) {
      let result: any;
      if (service.config && service.config[toggle] && methodName && this[methodName]) {
        result = this[methodName].apply(this, args);
      } else {
        result = original.apply(this, args);
      }

      return result;
    };

    return descriptor;
  };
};
