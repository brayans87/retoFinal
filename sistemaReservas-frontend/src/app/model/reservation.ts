import { NgModule } from "@angular/core";
import { Room } from "./room";

export class Reservation{

    id : number;
    customerName : string;
    checkInDate : string;
    checkOutDate : string;
    room : Room;

}