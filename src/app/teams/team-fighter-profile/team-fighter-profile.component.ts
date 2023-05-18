import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-team-fighter-profile',
  templateUrl: './team-fighter-profile.component.html',
  styleUrls: ['./team-fighter-profile.component.scss']
})
export class TeamFighterProfileComponent implements OnInit {

  constructor(public teamsService: TeamsService) { }

  ngOnInit(): void {
  }

}
