import { Component, OnInit, Input, TemplateRef } from '@angular/core';

import { CustomComponentComponent } from 'src/app/custom-component/custom-component.component';
import { DynamicComponentService } from 'src/app/services/dynamic-component/dynamic-component.service';
import { DynamicComponentConfig } from 'src/app/services/dynamic-component/dynamic-component-config.model';
import { DynamicComponent } from 'src/app/dynamic/dynamic.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @Input() customChildsTemplate: TemplateRef<any>;

  public childMetadataModelCustomTemplates: object;
  public childMetadataModelGenericTemplates: any[];
  public childMetadataModels: any[];

  constructor(private dynamicComponentService: DynamicComponentService) { }

  ngOnInit() {
    this.childMetadataModels = [
      {
        id: 'child1',
        title: 'Child 1',
        customTemplate: 'generic',
      },
      {
        id: 'child2',
        title: 'Child 2',
        customTemplate: 'generic',
      },
      {
        id: 'child3',
        title: 'Child 3',
        customTemplate: 'generic',
      },
      {
        id: 'child4custom',
        title: 'Child 4 Custom',
        customTemplate: 'custom',
      },
      {
        id: 'child5custom',
        title: 'Child 5 Custom',
        customTemplate: 'custom',
      },
      {
        id: 'child6custom',
        title: 'Child 6 Dynamic',
        customTemplate: 'dynamic',
        type: DynamicComponent,
      },
      {
        id: 'child7custom',
        title: 'Child 7 Dynamic',
        customTemplate: 'dynamic',
        type: DynamicComponent,
      },
    ];

    this.childMetadataModelGenericTemplates = this.childMetadataModels.filter(x => x.customTemplate === 'generic');
    this.childMetadataModelCustomTemplates = this.childMetadataModels.filter(x => x.customTemplate === 'custom').reduce((obj, x) => {
      obj[x.id] = x;
      return obj;
    }, {});

    this.childMetadataModels.filter(x => x.customTemplate === 'dynamic').forEach(y => {
      const config = {
        data: {
          title: y.title,
        },
      } as DynamicComponentConfig<any>;
      this.dynamicComponentService.create(y.type, config);
    });
  }
}
