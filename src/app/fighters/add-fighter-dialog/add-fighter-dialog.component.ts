import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FightersService } from '../services/fighters.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-fighter-dialog',
  templateUrl: './add-fighter-dialog.component.html',
  styleUrls: ['./add-fighter-dialog.component.scss']
})
export class AddFighterDialogComponent implements OnInit {

  fighterUrl = new FormControl('');
  constructor(public fightersService: FightersService, private dialogRef: MatDialogRef<AddFighterDialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.fightersService.clearFighterToAddStore();
    this.dialogRef.close();
  }

}
