import { Component, Input, OnInit } from '@angular/core';
import { MyTeamService } from '../services/my-team.service';
import { Fighter } from 'src/app/fighters/models/fighter';
import { Router } from '@angular/router';
import { FightersService } from 'src/app/fighters/services/fighters.service';


@Component({
  selector: 'app-my-team-table',
  templateUrl: './my-team-table.component.html',
  styleUrls: ['./my-team-table.component.scss']
})
export class MyTeamTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'weight_class', 'wins_total', 'losses_total', 'nc', 'wins_ko_sub', 'top_ten', 'title_fights', 'total_fights', 'actions'];
  @Input()
  dataSource!: Fighter[];

  constructor(public myTeamService: MyTeamService, 
              public router: Router,
    ) { }

  ngOnInit(): void {
  }

  viewFighter(fighter_id: string) {

    this.router.navigate([`/fighters/${fighter_id}`])
  }

  onDoubleClick(fighter: Fighter) {
    this.myTeamService.updateSelectedFighter(fighter)
    this.router.navigate([`/my-team/${fighter.fighter_id}`])
  }
}
