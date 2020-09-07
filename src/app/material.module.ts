import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatCheckboxModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatDialogModule,
    Material.MatDividerModule
   
  
  ],
  exports :[
    Material.MatToolbarModule, 
    Material.MatGridListModule,
     Material.MatFormFieldModule,
    Material.MatInputModule,
     Material.MatRadioModule,
      Material.MatSelectModule,
         Material.MatDatepickerModule,
         Material.MatCheckboxModule,
          Material.MatNativeDateModule,
           Material.MatButtonModule,
       Material.MatSnackBarModule,
        Material.MatTableModule,
        Material.MatIconModule,
    Material.MatDialogModule,
    Material.MatDividerModule
  
     ],
  declarations: []
})
export class MaterialModule { }