import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Fighter } from '../models/fighter';
import axios from 'axios';
import { load } from 'cheerio';
import { Fight } from '../models/fight';

@Injectable({
  providedIn: 'root'
})
export class FightersService {

  // raw data from firebase
  private fightersStore = new BehaviorSubject<Fighter[]>([]);
  public $fighters = this.fightersStore.asObservable();

  // stores search results
  private fighterSearchResultsStore = new BehaviorSubject<Fighter[]>([]);
  public $fighterSearchResults = this.fighterSearchResultsStore.asObservable();

  // used in displaying fights for a selected fighter.
  private selectedFighterStore = new BehaviorSubject<Fighter>({} as Fighter);
  public $selectedFighter = this.selectedFighterStore.asObservable();

  private fighterToAddStore = new BehaviorSubject<Fighter>({} as Fighter);
  public $fightToAdd = this.fighterToAddStore.asObservable();

  private readonly SHERDOG_URL = "https://www.sherdog.com/";

  bypassFighterStorage = true;

  constructor(public afs: AngularFirestore) {}

  updateFighters(fighters: Fighter[]) { 
    this.fightersStore.next(fighters);
  }

  updateFilteredResults(results: Fighter[]) {
    this.fighterSearchResultsStore.next(results);
  }

  updateSelectedFighter(fighter: Fighter) {
    this.selectedFighterStore.next(fighter)
  }

  updateFighterToAdd(fighter: Fighter) {
    this.fighterToAddStore.next(fighter)
  }

  getFightersValue() {
    return this.fightersStore.value;
  }

  getFightersValueLength() {
    return this.getFightersValue().length;
  }

  clearFighterToAddStore() {
    this.fighterToAddStore.next({} as Fighter)
  }

  async getFighters() {
    // store fighters in local to speed up load times.
    let storage_fighters = JSON.parse(localStorage.getItem('all_fighters') as any);
    if (!(storage_fighters && storage_fighters.length > 0) || this.bypassFighterStorage) {
      this.afs.collection<any>('fighters', ref => {
        return ref
      }).valueChanges().subscribe(async data => {
        this.updateFighters(data)
        this.updateFilteredResults(data)
        localStorage.setItem('all_fighters', JSON.stringify(data));
        this.bypassFighterStorage = false;
      })
    }
    this.updateFighters(storage_fighters)
    this.updateFilteredResults(storage_fighters)

    // remove this line
    console.log('fighters store size: ' + this.fightersStore.value.length)
  }

  // filters search results by name
  getFighterByName(name: string) {
    let fightResults = this.fightersStore.value.filter((fighter: any) => fighter.name.toLowerCase().includes(name))
    this.updateFilteredResults(fightResults)
  }

  getFighterById(id: number) {
    let fighterValues = this.fightersStore.value;
    let fightResults = fighterValues.filter((fighter: Fighter) => fighter.fighter_id == id)
    this.updateSelectedFighter(fightResults[0])
    return fightResults[0]
  }

  async searchFighterToAdd(fighterUrl: string) {
    const { data } = await axios.get(fighterUrl);
      const $ = load(data);
      const fighter: Fighter = {
        age: '',
        association: '',
        banked_flag: false,
        birthday: '',
        fight_style: '',
        fighter_id: this.getFightersValueLength() + 1,
        height: '',
        image_url: '',
        locality: '',
        name: '',
        nationality: '',
        nc: 0,
        nickname: '',
        weight: '',
        weight_class: '',
        wins_decisions: 0,
        wins_knockouts: 0,
        wins_submissions: 0,
        wins_total: 0,
        losses_decisions: 0,
        losses_knockouts: 0,
        losses_submissions: 0,
        losses_total: 0,
        wins_ko_sub: 0,
        top_ten: 0,
        title_fights: 0,
        total_fights: 0,
        fights: []
      };
      const imgUrl = $('[itemprop="image"]').attr("src");
      fighter.image_url = `${this.SHERDOG_URL}${imgUrl}`;
      fighter.name = $('[itemprop="name"] span.fn').text();
      fighter.nickname = $("span.nickname em").text();
  
      const fighterInfo = $(".association-class").text().trim().split("\n");
      fighter.association = fighterInfo[1].trim() || "--";
      fighter.weight_class = fighterInfo[4].trim() || "--";
      // fighter.fight_style = fighterInfo[6].trim().split("STYLE")[1];
  
      fighter.age =
        $("table > tbody > tr:nth-child(1) > td:nth-child(2) > b").text() || "--";
      fighter.birthday = $('span[itemprop="birthDate"]').text() || "--";
  
      fighter.locality = $('[itemprop="addressLocality"]').text() || "--";
      fighter.nationality = $('[itemprop="nationality"]').text() || "--";
      fighter.height = $('[itemprop="height"]').text() || "--";
      fighter.weight = $('[itemprop="weight"]').text() || "--";
  
      fighter.wins_total = parseInt(
        $(
          "div.winsloses-holder > div.wins > div.winloses.win > span:nth-child(2)"
        ).text()
      );
      fighter.wins_knockouts = parseInt(
        $("div.wins > div:nth-child(3) > div.pl").text()
      );
      fighter.wins_submissions = parseInt(
        $("div.wins > div:nth-child(5) > div.pl").text()
      );
      fighter.wins_decisions = parseInt(
        $("div.wins > div:nth-child(7) > div.pl").text()
      );
      let noContest = $("div.loses > div.winloses.nc > span:nth-child(2)").text();
      fighter.nc =
        noContest != ""
          ? parseInt($("div.loses > div.winloses.nc > span:nth-child(2)").text())
          : 0;
      fighter.losses_total = parseInt(
        $("div.loses > div.winloses.lose > span:nth-child(2)").text()
      );
      fighter.losses_knockouts = parseInt(
        $("div.loses > div:nth-child(3) > div.pl").text()
      );
      fighter.losses_submissions = parseInt(
        $("div.loses > div:nth-child(5) > div.pl").text()
      );
      fighter.losses_decisions = parseInt(
        $("div.loses > div:nth-child(7) > div.pl").text()
      );
      // Fighter Fight History
      $(".module.fight_history tr:not(.table_head)").each(function(i: number, elem: any){
        let el = $(this);
        const result = el.find("td:nth-child(1) .final_result").text();
        const opponent_name = el.find("td:nth-child(2) a").text();
        const opponent_url = el.find("td:nth-child(2) a").attr("href");
        const event_name = el.find("td:nth-child(3) a").text();
        const event_url = el.find("td:nth-child(3) a").attr("href");
        const event_date = el.find("td:nth-child(3) .sub_line").text();
        const method =
          el
            .find("td:nth-child(4)")
            .text()
            .split(/\)(.*)/)[0] + ")";
        const referee = el.find("td:nth-child(4) .sub_line").text();
        const round = el.find("td:nth-child(5)").text();
        const time = el.find("td:nth-child(6)").text();
        const fight_id = i + 1;
  
        const fight: any = {
          fight_id: fight_id,
          name: event_name,
          date: event_date,
          url: event_url,
          result: result,
          method: method,
          round: round,
          time: time,
          opponent: opponent_name,
        };
  
        if (result !== "") {
          fighter.fights.push(fight as any);
        }
      });
      this.updateFighterToAdd(this.updateStatsForFighter(fighter))
      console.table(this.updateStatsForFighter(fighter))
    }

  updateStatsForFighter(fighter: Fighter) {
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

  async addFighterToApp() {
    const id = this.fighterToAddStore.value.fighter_id;
    console.log('adding fighter to app: ' + id)
    this.afs.collection<any>('fighters', ref => {
      return ref
    }).ref.add(this.fighterToAddStore.value).then((doc) => {
      this.bypassFighterStorage = true;
      this.getFighters();
      console.log('fighter added to app: ' + doc)
    }).catch(err => {
      console.log(err)
    })
  }
}
