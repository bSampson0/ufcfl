import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Fight } from 'src/app/fighters/models/fight';
import { Fighter } from 'src/app/fighters/models/fighter';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { Roster, Team } from 'src/app/teams/models/team';

export interface TopFight {
  title_fight: boolean;
  top_ten: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {

  private myTeamStore = new BehaviorSubject<Team>({} as Team)
  public $teamStore = this.myTeamStore.asObservable();

  public selectedFighterStore = new BehaviorSubject<Fighter>({} as Fighter)
  public $selectedFighter = this.selectedFighterStore.asObservable();

  docId: string = '';
  durationInSeconds = 5;

  readonly dropMessage = "You Have successfully dropped your fighter.";
  readonly addMessage = "You have successfully added your fighter."

  readonly confirmDropMessage = "Are you sure you want to drop this fighter?"
  readonly confirmAddMessage = "Are you sure you want to add this fighter?"

  readonly maxSizeMessage = "Max roster size reached. You need to drop a fighter first."

  constructor(
    public dialog: MatDialog,
    public afs: AngularFirestore,
    private authService: AuthService,
    private _snackBar: MatSnackBar
    ) { }

  getMyTeam() {
    this.afs.collection<Team>('teams', ref => ref.where('user_id', '==', this.authService.getUserUid()))
      .snapshotChanges().subscribe((team) => {
        this.docId = team[0].payload.doc.id;
        const myTeam = team[0].payload.doc.data() as Team;
        this.updateMyTeamStore(myTeam);
      })
  }

  updateMyTeamStore(team: Team) {
    this.myTeamStore.next(team)
  }

  updateSelectedFighter(fighter: Fighter) {
    this.selectedFighterStore.next(fighter)
  }

  openConfirmationDialog(message: string, isAdd: boolean, fighter: Fighter) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: message,
        isAdd: isAdd, 
        fighter: fighter
      }
    });
  }

  addFighter(fighter: Fighter) {
    const rosters = this.myTeamStore.value.rosters;
    // max roster length
    if (rosters.length < 32) {
      const roster: Roster = {
        date_released: null,
        date_signed: new Date(),
        isBanked: false,
        fighter: fighter,
        transaction_type: "waiver"
      }
      roster.fighter = this.resetFighterData(roster.fighter)
      rosters.push(roster)
      console.table(roster)
      console.log(this.docId)
      this.afs.collection<Team>('teams', ref => ref)
        .doc(this.docId).update({ rosters: rosters })
        .then(() => this.openSnackBar(this.addMessage))
        .catch(error => {
          this.openSnackBar("Error: Check console.")
          console.log(error)
        });
    } else {
      this.openSnackBar(this.maxSizeMessage)
    }

  }
  
  dropFighter(fighter: Fighter) {
    const rosters = this.myTeamStore.value.rosters;
    const rosterIndex = rosters.findIndex((roster: Roster) => roster.fighter.fighter_id == fighter.fighter_id);
    rosters[rosterIndex].date_released = new Date();
    this.afs.collection<Team>('teams', ref => ref)
    .doc(this.docId).update({ rosters: rosters }).catch(error => console.log(error));
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: message
    });
  }
  
  updateFight(fight: Fight, formData: TopFight) {
    const myRosters = this.myTeamStore.value.rosters;
    const rosterIndex = myRosters.findIndex((roster: Roster) => roster.fighter.fighter_id === this.selectedFighterStore.value.fighter_id);

    const fightIndex = myRosters[rosterIndex].fighter.fights.findIndex((selectedFight: Fight) => {
      return fight.fight_id == selectedFight.fight_id && fight.date == selectedFight.date
    });

    if (formData.top_ten && !formData.title_fight) {
      myRosters[rosterIndex].fighter.fights[fightIndex].top_ten = true;
    }
    if (formData.title_fight) {
      myRosters[rosterIndex].fighter.fights[fightIndex].title_fight = true;
    }
    myRosters.map((roster: Roster) => {
      roster.fighter = this.updateStatsForFighter(roster.fighter)
      return roster;
    })
    console.table(myRosters)
    this.afs.collection<Team>('teams', ref => ref)
    .doc(this.docId).update({
      rosters: myRosters
    }).then(() => { 
      this.openSnackBar('fight has successfully been updated.') 
    }).catch(() => this.openSnackBar('Error upating'))
    
  }

  resetFighterData(fighter: Fighter) {
    fighter.nc = 0
    fighter.wins_decisions = 0
    fighter.wins_knockouts = 0
    fighter.wins_submissions = 0
    fighter.wins_total = 0
    fighter.losses_decisions = 0
    fighter.losses_knockouts = 0
    fighter.losses_submissions = 0
    fighter.losses_total = 0
    fighter.wins_ko_sub = 0
    fighter.top_ten = 0
    fighter.title_fights = 0
    fighter.total_fights = 0
    fighter.fights = [] as Fight[]
    return fighter;
  }

  updateStatsForFighter(fighter: Fighter)  {
    // update the stats for the fighter based on the fights array
    fighter.losses_total = 0;
    fighter.total_fights = 0;
    fighter.wins_total = 0;
    fighter.wins_knockouts = 0;
    fighter.wins_submissions = 0;
    fighter.wins_ko_sub = 0;
    fighter.top_ten = 0;
    fighter.title_fights = 0;
    fighter.wins_decisions = 0;
    fighter.losses_submissions = 0;
    fighter.losses_knockouts = 0;
    fighter.losses_decisions = 0;
  
    fighter.fights.forEach((fight) => {
      if (fight.result === "win") {
        fighter.wins_total++;
      }
      if (fight.result === "loss") {
        fighter.losses_total++;
      }
      if (
        !fight.method.toLowerCase().includes("decision") &&
        fight.result === "win"
      ) {
        fighter.wins_ko_sub++;
      }
  
      if (fight.result === "nc") {
        fighter.nc++;
      }
      if (fight.title_fight) {
        fighter.title_fights++;
      }
      if (fight.top_ten) {
        fighter.top_ten++;
      }
      fighter.total_fights++;
    });
    return fighter;
  };
}
