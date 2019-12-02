import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

import { DynamicComponentConfig } from 'src/app/services/dynamic-component/dynamic-component-config.model';
import { DynamicComponentInjector } from 'src/app/services/dynamic-component/dynamic-component-injector.model';
import { DynamicComponentRef } from 'src/app/services/dynamic-component/dynamic-component-ref.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  private container: Element;
  private dynamicComponentRefs: ComponentRef<any>[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector) { }

  public create<T>(componentType: Type<T>, config: DynamicComponentConfig, location: Element): DynamicComponentRef<T> {
    const componentRef = this.appendComponent(componentType, config);

    return componentRef;
  }

  public destroyAll(): void {
    this.dynamicComponentRefs.forEach(dynamicComponentRef => {
      this.applicationRef.detachView(dynamicComponentRef.hostView);
      dynamicComponentRef.destroy();
    });
  }

  private appendComponent<T>(component: Type<T>, config: DynamicComponentConfig): DynamicComponentRef<T> {
    const map = new WeakMap();
    map.set(DynamicComponentConfig, config);

    const dynamicComponentRef = new DynamicComponentRef<T>();
    map.set(DynamicComponentRef, dynamicComponentRef);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(new DynamicComponentInjector(this.injector, map));

    this.applicationRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<T>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    dynamicComponentRef.componentInstance = componentRef.instance;

    this.dynamicComponentRefs.push(componentRef);

    const subscription = dynamicComponentRef.afterDestroy.subscribe(() => {
      this.removeComponent<T>(componentRef);
      subscription.unsubscribe();
    });

    return dynamicComponentRef;
  }

  private removeComponent<T>(dynamicComponentRef: ComponentRef<T>): void {
    this.applicationRef.detachView(dynamicComponentRef.hostView);
    dynamicComponentRef.destroy();
  }
}
