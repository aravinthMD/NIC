import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@NgModule({
  declarations: [CustomInputComponent, CustomSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomInputComponent,
    CustomSelectComponent
  ]
})
export class SharedModule { }
