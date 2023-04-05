import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalComponent,
    SearchComponent,
    ButtonComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    SearchComponent,
    ButtonComponent,
    TableComponent
  ]
})
export class SharedModule { }
