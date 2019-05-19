import { FeatureTogglesModule, FEATURE_TOGGLE_SERVICE } from '../feature-toggle.module';

export const replaceMethodWithFunction = (toggle: string, func: any): MethodDecorator => {
  return (target: any, key: string, descriptor: any) => {
    let service: any;

    const originalNgOnInit = target.constructor.prototype.ngOnInit;
    const original = descriptor.value;

    target.ngOnInit = function(...args) {
      service = FeatureTogglesModule.injector.get(FEATURE_TOGGLE_SERVICE);
      const result = originalNgOnInit && originalNgOnInit.apply(this, args);

      return result;
    };

    descriptor.value = function(...args: any[]) {
      let result: any;
      if (service.config && service.config[toggle] && func) {
        result = func.apply(this, args);
      } else {
        result = original.apply(this, args);
      }

      return result;
    };

    return descriptor;
  };
};
