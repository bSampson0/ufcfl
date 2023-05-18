import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';
import { TeamsTableComponent } from './teams-table/teams-table.component';
import { RosterTableComponent } from './roster-table/roster-table.component';
import { MaterialModule } from '../material/material.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TeamFightsTableComponent } from './team-fights-table/team-fights-table.component';
import { TeamFighterProfileComponent } from './team-fighter-profile/team-fighter-profile.component';
import { TeamEditFightDialogComponent } from './team-edit-fight-dialog/team-edit-fight-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TeamsComponent,
    TeamRosterComponent,
    TeamsTableComponent,
    RosterTableComponent,
    TeamFightsTableComponent,
    TeamFighterProfileComponent,
    TeamEditFightDialogComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeamsModule { }
