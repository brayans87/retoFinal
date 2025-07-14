import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Room } from '../model/room';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericService<Room> {

 
  private roomChange : Subject<Room[]> = new Subject<Room[]>;
  private messageChange : Subject<string> = new Subject<string>;

    constructor() { 
    super(
      inject(HttpClient),
      `${environment.HOST}/rooms`
    );
  }

 
  setRoomChange(data : Room[]){

    this.roomChange.next(data);
  }

  getRoomChange(){
    return this.roomChange.asObservable();
  }

  setMessageChange(data : string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  

}
