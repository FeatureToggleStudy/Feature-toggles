import { Component, OnInit } from '@angular/core';
import { FeatureToggleFlags } from '../feature-toggle/decorators/feature-toggle-flags.decorator';
import { FeatureToggles } from '../feature-toggle/models/feature-toggle.model';
import { replaceMethodWith } from '../feature-toggle/decorators/replace-method-with.decorator';
import { replaceMethodWithFunction } from '../feature-toggle/decorators/replace-method-with-function.decorator';
import { replacePropertyWith } from '../feature-toggle/decorators/replace-property-with.decorator';
import { FeatureTogglesEnum } from '../app.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-module',
  templateUrl: './my-module.component.html',
  styleUrls: ['./my-module.component.css']
})
@FeatureToggleFlags()
export class MyModuleComponent implements OnInit {
  readonly __featureToggles: FeatureToggles<FeatureTogglesEnum>;
  readonly __featureToggles$: Observable<FeatureToggles<FeatureTogglesEnum>>;

  @replacePropertyWith(FeatureTogglesEnum.RANDOM_BACKGROUND, 'featureValue') originalValue = 'original';
  featureValue = 'feature B';

  constructor() {}

  ngOnInit() {
    console.log(this.__featureToggles);
    console.log(this.originalValue);
    console.log(this.originalFunction2('is working'));
  }

  newFeature(a, name) {
    return `Feature: ${name} ${a}`;
  }

  @replaceMethodWith(FeatureTogglesEnum.RANDOM_BACKGROUND, 'newFeature')
  originalFunction(a) {
    return `Original feature ${a}`;
  }

  @replaceMethodWithFunction(FeatureTogglesEnum.RANDOM_BACKGROUND, function(...args: any[]) {
    return this.newFeature(...args, FeatureTogglesEnum.RANDOM_BACKGROUND);
  })
  originalFunction2(a) {
    return `Original feature 2 ${a}`;
  }
}
