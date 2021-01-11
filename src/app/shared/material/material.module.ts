import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';


const materialComponents = [
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatTabsModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatRippleModule,
  MatCardModule,
  MatDividerModule,
  MatTooltipModule
]

@NgModule({
  declarations: [],
  imports: [
    materialComponents
  ],
  exports: [materialComponents],
  entryComponents : []
})
export class MaterialModule { }
