import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fight } from 'src/app/fighters/models/fight';
import { MyTeamService } from '../services/my-team.service';

@Component({
  selector: 'app-my-team-edit-fight-dialog',
  templateUrl: './my-team-edit-fight-dialog.component.html',
  styleUrls: ['./my-team-edit-fight-dialog.component.scss']
})
export class MyTeamEditFightDialogComponent implements OnInit {

  form!: FormGroup;
  constructor(
    public myTeamService: MyTeamService,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: {fight: Fight},
    public dialogRef: MatDialogRef<MyTeamEditFightDialogComponent>,
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
