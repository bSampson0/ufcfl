import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Fight } from '../models/fight';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-fights-table',
  templateUrl: './fights-table.component.html',
  styleUrls: ['./fights-table.component.scss']
})
export class FightsTableComponent implements OnInit {

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

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.tableData = new MatTableDataSource<Fight>(this.dataSource);
    this.tableData.paginator = this.paginator;
  }

}
