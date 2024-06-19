import { Time } from "@angular/common"

export declare type Travel = {
    id?: number,
    depart_travel: string,
    destination_travel: string,
    start_hour_travel: Time,
    start_end_travel: Time,
    nbre_sits_travel: number,
    car_travel: string,
    pref_travel: string,
    comment_travel: Text,
}