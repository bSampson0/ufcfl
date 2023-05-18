import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fight } from '../models/fight';
import { FightersService } from '../services/fighters.service';

@Component({
  selector: 'app-fighter-profile',
  templateUrl: './fighter-profile.component.html',
  styleUrls: ['./fighter-profile.component.scss']
})
export class FighterProfileComponent implements OnInit {
  selectedId!: number;
  fights: Fight[] = [];
  constructor(private route: ActivatedRoute, public fightersService: FightersService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId = params['id'];
      this.fightersService.getFighterById(this.selectedId);
    })
  }

}
