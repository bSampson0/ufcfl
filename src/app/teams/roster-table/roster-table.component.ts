import { Component, Input, OnInit } from '@angular/core';
import { Fighter } from 'src/app/fighters/models/fighter';
import { TeamsService } from '../services/teams.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-roster-table',
  templateUrl: './roster-table.component.html',
  styleUrls: ['./roster-table.component.scss']
})
export class RosterTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'weight_class', 'wins_total', 'losses_total', 'nc', 'wins_ko_sub', 'top_ten', 'title_fights', 'total_fights', 'actions'];
  @Input()
  dataSource: Fighter[] = [];

  constructor(public teamsService: TeamsService, public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.teamsService.getMyTeamUserId() === this.authService.getUserUid())
    console.log(this.authService.getUserUid())
    console.log(this.teamsService.getMyTeamUserId())
  }

  onDoubleClick(fighter: Fighter) {
    this.teamsService.updateSelectedFighter(fighter)
    this.router.navigate([`/teams/fighter/${fighter.fighter_id}`])
  }

}
