import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fight } from 'src/app/fighters/models/fight';
import { TeamEditFightDialogComponent } from '../team-edit-fight-dialog/team-edit-fight-dialog.component';

@Component({
  selector: 'app-team-fights-table',
  templateUrl: './team-fights-table.component.html',
  styleUrls: ['./team-fights-table.component.scss']
})
export class TeamFightsTableComponent implements OnInit {

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

  constructor (public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.tableData = new MatTableDataSource<Fight>(this.dataSource);
    this.tableData.paginator = this.paginator;
  }

  onDblClick(fight: Fight) {
    this.dialog.open(TeamEditFightDialogComponent, {
      data: {
        fight: fight,
      }
    })
  }

}
