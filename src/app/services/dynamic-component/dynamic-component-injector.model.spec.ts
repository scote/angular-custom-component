import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DynamicComponentInjector } from 'src/app/services/dynamic-component/dynamic-component-injector.model';
import { DynamicComponentRef } from 'src/app/services/dynamic-component/dynamic-component-ref.model';

describe('DynamicComponentInjector', () => {
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Injector],
    }).compileComponents();

    injector = TestBed.get(Injector);
  });

  describe('get', () => {
    it('should get token from "_additionalTokens"', () => {
      const dynamicComponentRef = new DynamicComponentRef<string>();

      const additionalTokens = new WeakMap<any, any>();
      additionalTokens.set(DynamicComponentRef, dynamicComponentRef);

      additionalTokens.set(DynamicComponentRef, dynamicComponentRef);
      const dynamicComponentInjector = new DynamicComponentInjector(injector, additionalTokens);

      spyOn(dynamicComponentInjector._parentInjector, 'get');

      expect(dynamicComponentInjector.get(DynamicComponentRef)).toBe(dynamicComponentRef);
      // tslint:disable-next-line: deprecation
      expect(dynamicComponentInjector._parentInjector.get).not.toHaveBeenCalled();
    });

    it('should get token from parent injector when it is not in "_additionalTokens"', () => {

      const dynamicComponentInjector = new DynamicComponentInjector(injector, new WeakMap<any, any>());

      spyOn(dynamicComponentInjector._parentInjector, 'get');

      expect(dynamicComponentInjector.get(DynamicComponentRef, null)).toBe(undefined);
      // tslint:disable-next-line: deprecation
      expect(dynamicComponentInjector._parentInjector.get).toHaveBeenCalledWith(DynamicComponentRef, null);
    });
  });
});
