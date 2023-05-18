import { Fighter } from "src/app/fighters/models/fighter";

export interface Team {
    ko_sub: number,
    league_id:number,
    losses: number,
    points: number,
    points_behind: number,
    team_id: number,
    team_name: string,
    title_fights: number,
    top_ten: number,
    total_fights: number,
    user_id: string,
    win_percent: number,
    wins: number,
    rosters: Roster[]
}

export interface Roster {
    date_released: any,
    date_signed: any,
    isBanked: boolean,
    transaction_type: string,
    fighter: Fighter;
}