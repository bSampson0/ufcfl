import { Component, OnInit } from '@angular/core';
import { FightersService } from './services/fighters.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFighterDialogComponent } from './add-fighter-dialog/add-fighter-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {

  constructor(public fightersService: FightersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fightersService.getFighters();
  }

  addFighterDialog() {
    const dialogRef = this.dialog.open(AddFighterDialogComponent)
  }
}
