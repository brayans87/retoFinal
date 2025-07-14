import { Component, Inject, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../model/room';
import { Reservation } from '../../../model/reservation';

import { ReservationService } from '../../../services/reservation.service';
import { switchMap, tap } from 'rxjs';
import { format } from 'date-fns';


@Component({
  selector: 'app-reservation-manager-edit',
  imports: [MaterialModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-manager-edit.component.html',
  styleUrl: './reservation-manager-edit.component.css'
})
export class ReservationManagerEditComponent {

  private roonService = inject(RoomService);
  private reservationService = inject(ReservationService);

  readonly _dialogRef = inject(MatDialogRef<ReservationManagerEditComponent>);

  rooms: Room[] = [];

  form: FormGroup;
  submitted = false;

  ngOnInit(): void {

    this.form = new FormGroup({

      id: new FormControl(),
      customerName: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(70) ]),
      checkInDate: new FormControl('', Validators.required),
      checkOutDate: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required)
    });


    this.roonService.findByAvailable().subscribe(data => this.rooms = data);
    this.reservationService.getRoomChange().subscribe(data => this.rooms = data );

  }

  operate() {

   this.submitted = true;

    if(this.form.invalid){
      return;
    }

    const reservation: Reservation = new Reservation();

    reservation.customerName = this.form.value['customerName'];
    reservation.checkInDate = format(this.form.value['checkInDate'], "yyyy-MM-dd");
    reservation.checkOutDate = format(this.form.value['checkOutDate'], "yyyy-MM-dd");
    reservation.room = this.form.value['room'];


    this.reservationService.save(reservation).pipe(

      switchMap(() => this.reservationService.findAll()),
      tap(data => this.reservationService.setReservationChange(data)),
      tap(() => this.reservationService.setMessageChange('CREATED!'))
    ).subscribe();

    console.log(reservation);

    this.close();

  }

  close() {

    this._dialogRef.close();

  }

  get f(){
    return this.form.controls;
  }

}
