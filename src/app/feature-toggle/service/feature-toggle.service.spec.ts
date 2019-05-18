/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeatureToggleService } from './feature-toggle.service';

describe('Service: FeatureToggle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureToggleService]
    });
  });

  it('should ...', inject([FeatureToggleService], (service: FeatureToggleService<any>) => {
    expect(service).toBeTruthy();
  }));
});
