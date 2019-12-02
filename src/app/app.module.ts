import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomComponentComponent } from './custom-component/custom-component.component';
import { GenericComponentComponent } from './generic-component/generic-component.component';
import { ListComponent } from './list/list.component';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomComponentComponent,
    GenericComponentComponent,
    ListComponent,
    DynamicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [DynamicComponent],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
