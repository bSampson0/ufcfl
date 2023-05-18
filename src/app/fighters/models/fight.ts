export interface Fight {
    date: string,
    fight_id: number,
    method: string,
    name: string,
    opponent:string,
    result: string,
    round: string,
    time: string,
    url: string,
    top_ten?: boolean,
    title_fight?: boolean
}