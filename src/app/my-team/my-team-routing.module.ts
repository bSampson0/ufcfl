import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTeamComponent } from './my-team.component';
import { MyTeamFighterProfileComponent } from './my-team-fighter-profile/my-team-fighter-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MyTeamComponent
  },
  {
    path: ':id',
    component: MyTeamFighterProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule { }