import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './core/profile/profile.component';
import { SignInComponent } from './core/sign-in/sign-in.component';
import { CreateAccountComponent } from './core/create-account/create-account.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'fighters', loadChildren: () => import('./fighters/fighters.module').then(m => m.FightersModule), canActivate: [AuthGuard] },
  { path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'create-account', component: CreateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
