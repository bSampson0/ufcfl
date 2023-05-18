import { Component, Inject, OnInit } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fight } from 'src/app/fighters/models/fight';

@Component({
  selector: 'app-team-edit-fight-dialog',
  templateUrl: './team-edit-fight-dialog.component.html',
  styleUrls: ['./team-edit-fight-dialog.component.scss']
})
export class TeamEditFightDialogComponent implements OnInit {

  form!: FormGroup;
  constructor(
    public teamsService: TeamsService,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: {fight: Fight},
    public dialogRef: MatDialogRef<TeamEditFightDialogComponent>,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      top_ten: this.data.fight.top_ten || false,
      title_fight: this.data.fight.title_fight || false,
    })
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
