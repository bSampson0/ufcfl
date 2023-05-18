import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FightersComponent } from './fighters.component';
import { FightersTableComponent } from './fighters-table/fighters-table.component';
import { FightsTableComponent } from './fights-table/fights-table.component';
import { FighterProfileComponent } from './fighter-profile/fighter-profile.component';
import { FightersRoutingModule } from './fighters-routing.module';
import { MaterialModule } from '../material/material.module';
import { AddFighterDialogComponent } from './add-fighter-dialog/add-fighter-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FightersComponent,
    FightersTableComponent,
    FightsTableComponent,
    FighterProfileComponent,
    AddFighterDialogComponent,
  ],
  imports: [
    CommonModule,
    FightersRoutingModule, 
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FightersModule { }
