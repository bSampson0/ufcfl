import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FightersService } from '../services/fighters.service';
import { Fighter } from '../models/fighter';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TeamsService } from 'src/app/teams/services/teams.service';

@Component({
  selector: 'app-fighters-table',
  templateUrl: './fighters-table.component.html',
  styleUrls: ['./fighters-table.component.scss']
})
export class FightersTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'weight_class', 'wins_total', 'losses_total', 'nc', 'wins_knockouts', 'wins_submissions', 'actions'];
  @Input() dataSource!: Fighter[];

  tableData!: MatTableDataSource<Fighter>

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public fighters: FightersService, public router: Router, public teamsService: TeamsService) {}

  ngOnInit(): void {
    this.tableData = new MatTableDataSource<Fighter>(this.dataSource);
  }

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  onDblClick(fighter_id: string) {
    console.log('redirecting')
    this.router.navigate([`/fighters/${fighter_id}`])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  openConfirmationDialog(fighter: Fighter) {
    this.teamsService.openConfirmationDialog(this.teamsService.confirmAddMessage, true, fighter)
  }

}