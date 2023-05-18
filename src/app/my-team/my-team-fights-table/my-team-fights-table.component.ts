import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fight } from 'src/app/fighters/models/fight';
import { Fighter } from 'src/app/fighters/models/fighter';
import { MyTeamService } from '../services/my-team.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MyTeamEditFightDialogComponent } from '../my-team-edit-fight-dialog/my-team-edit-fight-dialog.component';

@Component({
  selector: 'app-my-team-fights-table',
  templateUrl: './my-team-fights-table.component.html',
  styleUrls: ['./my-team-fights-table.component.scss']
})
export class MyTeamFightsTableComponent implements OnInit {

  displayedColumns: string[] = [
    'date',
    'method',
    'opponent',
    'result',
    'round',
    'time',
  ];
  @Input() dataSource!: Fight[];

  tableData!: MatTableDataSource<Fight>

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor (public myTeamService: MyTeamService, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.tableData = new MatTableDataSource<Fight>(this.dataSource);
    this.tableData.paginator = this.paginator;
  }

  onDblClick(fight: Fight) {
    this.dialog.open(MyTeamEditFightDialogComponent, {
      data: {
        fight: fight,
      }
    })
  }

}
