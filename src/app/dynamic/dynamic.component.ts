import { Component } from '@angular/core';

import { DynamicComponentConfig } from 'src/app/services/dynamic-component/dynamic-component-config.model';
import { DynamicComponentRef } from 'src/app/services/dynamic-component/dynamic-component-ref.model';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.sass']
})
export class DynamicComponent {
  constructor(public componentConfig: DynamicComponentConfig<any>,
              private dynamicComponentRef: DynamicComponentRef<DynamicComponent>) {}
}
