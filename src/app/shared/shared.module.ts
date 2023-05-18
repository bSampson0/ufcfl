import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { UfcflTableComponent } from './ufcfl-table/ufcfl-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    SnackbarComponent,
    UfcflTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
