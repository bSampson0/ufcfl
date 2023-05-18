import { Component, OnInit } from '@angular/core';
import { MyTeamService } from './services/my-team.service';
import { Fighter } from '../fighters/models/fighter';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  durationInSeconds = 5;
  myFighters!: Fighter[];
  constructor(public myTeamService: MyTeamService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.myTeamService.getMyTeam();
    this.myTeamService.$teamStore.subscribe(team => {
      this.myFighters = team.rosters.filter(roster => roster.date_released === null).map(roster => roster.fighter)
    })
  }
}
