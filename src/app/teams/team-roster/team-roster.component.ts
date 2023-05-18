import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { ActivatedRoute } from '@angular/router';
import { Fighter } from 'src/app/fighters/models/fighter';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.scss']
})
export class TeamRosterComponent implements OnInit {
  selectedId!: number;
  fighters!: Fighter[]
  constructor(public teamsService: TeamsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedId = params['id'];
      console.log(this.selectedId+ " getting id");
      this.teamsService.getTeamById(this.selectedId);
    })
    this.teamsService.$selectedTeam.subscribe(team => {
      this.fighters = team.rosters.filter(roster => roster.date_released === null).map(roster => roster.fighter)
    })
  }
}
