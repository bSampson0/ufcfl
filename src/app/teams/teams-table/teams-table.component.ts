import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss']
})
export class TeamsTableComponent implements OnInit {
  @Input() teams!: Team[];
  readonly displayedColumns = [
    'team_name',
    'points',
    'wins',
    'losses',
   'ko_sub',
   'title_fights',
   'top_ten',
   'points_behind',
  ]
 constructor(public router: Router) { }

 ngOnInit(): void {

 }

 onDblClick(team_id: string) {
  console.log('redirecting')
  this.router.navigate([`/teams/${team_id}`])
}

}
