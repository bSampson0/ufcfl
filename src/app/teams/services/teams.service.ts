import { Injectable } from '@angular/core';
import { Roster, Team } from '../models/team';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Fight } from 'src/app/fighters/models/fight';
import { Fighter } from 'src/app/fighters/models/fighter';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

export interface TopFight {
  title_fight: boolean;
  top_ten: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private teamsStore = new BehaviorSubject<Team[]>([] as Team[]);
  public $teams = this.teamsStore.asObservable();

  private selectedTeamStore = new BehaviorSubject<Team>({} as Team);
  public $selectedTeam = this.selectedTeamStore.asObservable();

  public selectedFighterStore = new BehaviorSubject<Fighter>({} as Fighter)
  public $selectedFighter = this.selectedFighterStore.asObservable();

  private myTeamStore = new BehaviorSubject<Team>({} as Team)
  public $teamStore = this.myTeamStore.asObservable();

  readonly dropMessage = "You Have successfully dropped your fighter.";
  readonly addMessage = "You have successfully added your fighter."

  readonly confirmDropMessage = "Are you sure you want to drop this fighter?"
  readonly confirmAddMessage = "Are you sure you want to add this fighter?"

  readonly maxSizeMessage = "Max roster size reached. You need to drop a fighter first."

  readonly durationInSeconds = 5;

  constructor(
    public afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    public dialog: MatDialog
    ) { }

  updateTeams(teams: Team[]) {
    this.teamsStore.next(teams);
  }

  updateSelectedTeam(team: Team) {
    this.selectedTeamStore.next(team);
  }

  updateSelectedFighter(fighter: Fighter) {
    this.selectedFighterStore.next(fighter)
  }

  updateMyTeamStore(team: Team) {
    this.myTeamStore.next(team)
  }

  async getTeams() {
    this.afs.collection<Team>('teams', ref => ref)
    .valueChanges().subscribe(teams => {
      this.updateTeams(this.calcStandingsForTeam(teams))
      const myTeam = teams.find(team => team.user_id === this.authService.getUserUid())
      this.updateMyTeamStore(myTeam as Team)
    })
  }

  getMyTeamUserId() {
    return this.myTeamStore.value.user_id;
  }

  getTeamById(teamId: number) {
    this.teamsStore.subscribe(teams => {
      let team = teams.find(team => team.team_id == teamId);
      if (team) {
        this.updateSelectedTeam(team);
      }
    })
  }

  calcStandingsForTeam(teams: Team[]) {
    const updatedTeams: Team[] = [];
    teams.forEach(team => {
      team.points = 0
      team.wins= 0
      team.losses= 0
      team.win_percent= 0
      team.title_fights = 0
      team.top_ten= 0
      team.ko_sub= 0
      team.win_percent = 0;
      team.points_behind = 0;
      team.total_fights = 0;
      team.rosters.forEach((roster: Roster) => {
        if (roster.fighter.fights.length > 0) {
          roster.fighter.fights.forEach((fight: Fight) => {
            if (fight.result === "win") {
              team.wins++;
            }
            if (fight.result === "loss") { 
              team.losses++;
            }
            if (fight.top_ten) {
              team.top_ten++;
            }
            if (fight.title_fight) {
              team.title_fights++;
            }
            team.win_percent = Math.floor(100 * (team.wins / (team.wins + team.losses)));
            if (!fight.method.toLowerCase().includes('decision') && fight.result === "win") {
              team.ko_sub++
            }
          })
        }
  
      })
      team.points = (team.wins - team.losses + (team.ko_sub * .5) + (team.top_ten * .5) + team.title_fights);
      updatedTeams.push(team);
    })
    return updatedTeams;
  }
  
  addFighter(fighter: Fighter, date?: Date) {
    const rosters = this.selectedTeamStore.value.rosters;
    const date_signed = date ? date : new Date();
    const roster: Roster = {
      date_released: null,
      date_signed: date_signed,
      isBanked: false,
      fighter: fighter,
      transaction_type: "waiver"
    }
    roster.fighter = this.resetFighterData(roster.fighter)
    rosters.push(roster)
    try {      
      this.afs.collection<Team>('teams', ref => ref.where('team_id', '==', this.selectedTeamStore.value.team_id))
        .get()
        .subscribe((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({ rosters: rosters });
          })
        })
    } catch (error) {
      console.error(error)
    }
  }

  dropFighter(fighter: Fighter, date?: Date) {
    const rosters = this.selectedTeamStore.value.rosters;
    const rosterIndex = rosters.findIndex((roster: Roster) => roster.fighter.fighter_id == fighter.fighter_id);
    rosters[rosterIndex].date_released = date ? date : new Date();
    try {      
      this.afs.collection<Team>('teams', ref => ref.where('team_id', '==', this.selectedTeamStore.value.team_id))
        .get()
        .subscribe((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({ rosters: rosters });
          })
        })
    } catch (error) {
      console.error(error)
    }
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

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: message
    });
  }

  updateFight(fight: Fight, formData: TopFight) {
    const myRosters = this.selectedTeamStore.value.rosters;
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
 
    this.afs.collection<Team>('teams', ref => ref.where('team_id', '==', this.selectedTeamStore.value.team_id))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ rosters: myRosters }).then(() => { 
            this.openSnackBar('fight has successfully been updated.') 
          }).catch(() => this.openSnackBar('Error upating'));
        })
      })
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
