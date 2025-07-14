import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../model/reservation';
import { Subject } from 'rxjs';
import { Room } from '../model/room';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class ReservationService extends GenericService<Reservation> {

  private reservationChange: Subject<Reservation[]> = new Subject<Reservation[]>;
  private messageChange: Subject<string> = new Subject<string>;
  private roomChange: Subject<Room[]> = new Subject<Room[]>;

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/reservations`
    );
  }

  setReservationChange(data: Reservation[]) {
    this.reservationChange.next(data);
  }

  getReservationChange() {
    return this.reservationChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

  setRoomChange(data: Room[]) {
    this.roomChange.next(data);
  }

  getRoomChange() {
    return this.roomChange.asObservable();
  }

}
