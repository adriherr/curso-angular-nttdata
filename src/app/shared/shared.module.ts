import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    SharedTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SharedTableComponent
  ]
})
export class SharedModule { }
