import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTeamComponent } from './my-team.component';
import { MyTeamTableComponent } from './my-team-table/my-team-table.component';
import { MaterialModule } from '../material/material.module';
import { MyTeamRoutingModule } from './my-team-routing.module';
import { MyTeamFighterProfileComponent } from './my-team-fighter-profile/my-team-fighter-profile.component';
import { MyTeamFightsTableComponent } from './my-team-fights-table/my-team-fights-table.component';
import { MyTeamEditFightDialogComponent } from './my-team-edit-fight-dialog/my-team-edit-fight-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyTeamComponent,
    MyTeamTableComponent,
    MyTeamFighterProfileComponent,
    MyTeamFightsTableComponent,
    MyTeamEditFightDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyTeamRoutingModule
  ]
})
export class MyTeamModule { }
