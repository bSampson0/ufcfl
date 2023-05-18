import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ufcfl-table',
  templateUrl: './ufcfl-table.component.html',
  styleUrls: ['./ufcfl-table.component.scss']
})
export class UfcflTableComponent implements OnInit, AfterViewInit {

  @Input() tableData!: any;
  @Input() columnHeader!: any;
  @Input() hasFilters = false;

  @ViewChild(MatSort) sort!: MatSort;

  objectKeys = Object.keys;
  dataSource: any;
  filterValue = ''

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
