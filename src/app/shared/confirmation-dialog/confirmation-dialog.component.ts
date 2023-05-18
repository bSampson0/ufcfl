import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fighter } from 'src/app/fighters/models/fighter';
import { FormControl } from '@angular/forms';
import { TeamsService } from '../../teams/services/teams.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  datePicker!: Date;

  constructor(
    public teamsService: TeamsService, 
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message: string, isAdd: boolean, fighter: Fighter}
    ) { }

  ngOnInit(): void {
    console.table(this.data.fighter)
  }

  confirm() {
    this.data.isAdd ? this.teamsService.addFighter(this.data.fighter, this.datePicker) : this.teamsService.dropFighter(this.data.fighter, this.datePicker);
    this.dialogRef.close();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
