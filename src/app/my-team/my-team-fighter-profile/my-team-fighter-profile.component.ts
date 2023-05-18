import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyTeamService } from 'src/app/my-team/services/my-team.service';

@Component({
  selector: 'app-my-team-fighter-profile',
  templateUrl: './my-team-fighter-profile.component.html',
  styleUrls: ['./my-team-fighter-profile.component.scss']
})
export class MyTeamFighterProfileComponent implements OnInit {

  constructor(public myTeamService: MyTeamService) { }

  ngOnInit(): void {
  }

}
