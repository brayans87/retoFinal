import { Routes } from '@angular/router';
import { RoomManagerComponent } from './room-manager/room-manager.component';
import { RoomManagerEditComponent } from './room-manager/room-manager-edit/room-manager-edit.component';
import { ReservationManagerComponent } from './reservation-manager/reservation-manager.component';
import { ReservationManagerEditComponent } from './reservation-manager/reservation-manager-edit/reservation-manager-edit.component';


export const pagesRoutes: Routes = [
  
  {path : 'room', component: RoomManagerComponent,
       
         children: [
             {path: 'new', component: RoomManagerEditComponent},
             {path: 'edit/:id', component: RoomManagerEditComponent}
         ],
     },
     {path : 'reservation', component: ReservationManagerComponent,
         children : [
         
             {path : 'new', component: ReservationManagerEditComponent},
             {path : 'edit/:id', component: ReservationManagerEditComponent}
         ],
     }
 
];
