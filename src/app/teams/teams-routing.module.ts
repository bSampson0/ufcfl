import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';
import { TeamFighterProfileComponent } from './team-fighter-profile/team-fighter-profile.component';




const routes: Routes = [
  {
    path: '',
    component: TeamsComponent
  },
  {
    path: ':id',
    component: TeamRosterComponent
  },
  {
    path: 'fighter/:id',
    component: TeamFighterProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }