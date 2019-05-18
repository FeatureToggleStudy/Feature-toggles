import { Injectable, OnDestroy } from '@angular/core';
import { FeatureToggles } from '../models/feature-toggle.model';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService<T extends string> implements OnDestroy {
  private _config: FeatureToggles<T>;
  private readonly _config$: BehaviorSubject<FeatureToggles<T>> = new BehaviorSubject(undefined);
  private readonly _subscription = new Subscription();
  private _configSubscription = new Subscription();

  constructor(config?: FeatureToggles<T>) {
    if (!(this instanceof FeatureToggleService)) {
      return new FeatureToggleService(config);
    }
    this.config$ = new BehaviorSubject(config);
    this.subscribeConfig();
  }

  get config(): FeatureToggles<T> {
    return this._config;
  }

  get config$(): Observable<FeatureToggles<T>> {
    return this._config$;
  }

  set config$(value: Observable<FeatureToggles<T>>) {
    if (value instanceof Observable) {
      this._configSubscription.unsubscribe();
      this._configSubscription = new Subscription();
      this._configSubscription.add(value.subscribe((val: FeatureToggles<T>) => this._config$.next(val)));
    }
  }

  private subscribeConfig() {
    return this._config$.subscribe(c => (this._config = c));
  }

  ngOnDestroy(): void {
    this._configSubscription.unsubscribe();
    this._subscription.unsubscribe();
  }
}
