import { Component, OnInit } from '@angular/core';
import { TeamsService } from './services/teams.service';
import { Team } from './models/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  standings!: Team[];
  constructor(public teamsService: TeamsService) { }

  ngOnInit(): void {
    console.log('getting tesms')
    this.teamsService.getTeams();
  }

}
