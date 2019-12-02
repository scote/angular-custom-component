import { Component, NgModule, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DynamicComponentConfig } from 'src/app/services/dynamic-component/dynamic-component-config.model';
import { DynamicComponentRef } from 'src/app/shared/services/dynamic-component/dynamic-component-ref.model';
import { DynamicComponentService } from 'src/app/shared/services/dynamic-component/dynamic-component.service';
import { configureTestSuite } from 'src/app/shared/utils/tests';

@Component({
  template: '',
  selector: 'noop',
})
class NoopComponent implements OnInit {
  public config: string;

  constructor(
    private componentConfig: DynamicComponentConfig<string>,
    private dynamicComponentRef: DynamicComponentRef<NoopComponent>,
  ) { }

  public ngOnInit(): void {
    this.config = this.componentConfig.data;
  }
}

@NgModule({
  exports: [
    NoopComponent,
  ],
  declarations: [
    NoopComponent,
  ],
  entryComponents: [
    NoopComponent,
  ],
})
class NoopModule { }

describe('DynamicComponentService', () => {
  let dynamicComponentService: DynamicComponentService;

  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopModule],
      providers: [DynamicComponentService],
    }).compileComponents();

    dynamicComponentService = TestBed.get(DynamicComponentService);
  });

  afterEach(() => {
    dynamicComponentService.destroyAll();
  });

  describe('create', () => {
    it('should create component and attach it to document', () => {
      const config = {
        data: 'test',
      } as DynamicComponentConfig<string>;

      const dynamicComponentRef = dynamicComponentService.create(NoopComponent, config);

      expect(dynamicComponentRef).toBeDefined();
      expect(document.querySelector('noop')).toBeDefined();

      dynamicComponentRef.componentInstance.ngOnInit();
      expect(dynamicComponentRef.componentInstance.config).toBe('test');
    });

    it('should remove component from document when it is destroyed', () => {
      const dynamicComponentRef = dynamicComponentService.create(NoopComponent, {});

      dynamicComponentRef.destroy();

      expect(document.querySelector('noop')).toBe(null);
    });
  });

  describe('destroyAll', () => {
    it('should create component and attach it to document', () => {
      dynamicComponentService.create(NoopComponent, {});
      dynamicComponentService.create(NoopComponent, {});

      expect(document.querySelectorAll('noop').length).toBe(2);

      dynamicComponentService.destroyAll();
      expect(document.querySelectorAll('noop').length).toBe(0);
    });
  });
});
