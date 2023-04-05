import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../shared/material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { RoutesModule } from '../routes/routes.module';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    RoutesModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
