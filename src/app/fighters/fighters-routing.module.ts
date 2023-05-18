import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FightersComponent } from './fighters.component';
import { FighterProfileComponent } from './fighter-profile/fighter-profile.component';



const routes: Routes = [
  {
    path: '',
    component: FightersComponent
  },
  {
    path: ':id',
    component: FighterProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FightersRoutingModule { }